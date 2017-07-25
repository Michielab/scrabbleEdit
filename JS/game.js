var game;
window.onload = function(){
  game = new Scrabble();
  createBoard();
  getTiles();
  allowDropOnCell();
  hidePlayerBoard();
  $("#numberTiles").text(game.tiles.length);
  click()
};

function click (){
    var tile = $('.tile').click(function(e) {
      var letter = e.currentTarget.innerText.split('')[0];
      var points = e.currentTarget.innerText.split('')[1];
      var id = e.target.id;
      var tile = {letter, points,id};
      var that = this;
      e.target.className.split(' ').length > 1 ? takeLetters(that,id): pickLetterForSwap(that,tile) ;
    });
}

function takeLetters (that,id){
  $(that).removeClass("color");
  game.swapLetters = game.swapLetters.filter((tileObject)=>{
  return tileObject.id !== id;
  });
}

function pickLetterForSwap(that,tile){
  $(that).addClass("color");
  game.swapLetters.push(tile);
}

//Game functions
function playWord(){
 game.checkWords();
 game.incorrectWord !== true ? nextTurn() : game.replay();
}

function nextTurn(){
  removeTiles();
  game.addScore();
  $(`#${game.playerTurn.name}`).text(game.playerTurn.score);
  game.changePlayer();
  removeDraggebleAttr();
  getTiles();
  $("#tilesLeft").text(`${game.tiles.length} tiles left`);
  hidePlayerBoard();
  click();
  console.log("game", game)
}

function getTiles() {
  game.fillArrayOfLetters();
  game.playerTurn.tiles.forEach((tile)=>{
    var newTile = $("<div>").addClass('tile').attr( 'id', tile.id).attr('draggable','true').attr('ondragstart','drag(event)').text(tile.title);
    var score = $("<span>").text(tile.points).addClass('tilePoints');
    newTile.append(score);
    $('#tileHolder').append(newTile);
  });
}

function swap(){
  removeTiles();
  game.letterSwap();
  getTiles();
  removeTiles();
  game.changePlayer();
  getTiles();
  hidePlayerBoard();
  click()
}

function removeTiles(){
  var swapArray = [];
  game.swapLetters === [] ? swapArray = game.swapLetters : swapArray = game.playerTurn.tiles;
  swapArray.forEach((tile)=>{
    $('#' + tile.id).remove();
  });
  game.swapArray = [];
}

function hidePlayerBoard(){
  if(game.playerTurn.name === "playerOne"){
    $(".playerScoreBoards:eq( 1 )").fadeTo( 1, 0.1);
    $(".playerScoreBoards:eq( 0 )").fadeTo( 1, 1);
  } else {
    $(".playerScoreBoards:eq( 0 )").fadeTo( 1, 0.1);
    $(".playerScoreBoards:eq( 1 )").fadeTo( 1, 1);
  }
}

//functions to remove drag and drop attributes
function removeDraggebleAttr(){
  for(var i = 0; i < game.currentBoard.length; i++) {
    var currentBoard = game.currentBoard[i];
    for(var j = 0; j < currentBoard.length; j++) {
      game.currentBoard[i][j].id ? $('#' + game.currentBoard[i][j].id).attr( 'draggable', "false"):"";
    }
  }
}

function allowDropOnCell(){
  for(var i = 0; i < game.currentBoard.length - 1; i++) {
    var currentBoards = game.currentBoard[i];
    for(var j = 0; j < currentBoards.length - 1; j++) {
      if(game.currentBoard[i][j] !== false) {
         $('#' + ((i + 1) + "-" +j)).attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)');
         $('#' + ((i - 1) + "-" +j)).attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)');
         $('#' + (i + "-" +(j + 1))).attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)');
         $('#' + (i + "-" +(j - 1))).attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)');
        //  $('#' + (i + "-" +j)).removeAttr( "ondrop" );
      }
    }
  }
}

//drag and drop functions
function allowDrop(ev, el) {
  ev.preventDefault();
}


function drag(ev,el) {
  if(ev.target.parentNode.parentNode.id === "board") {
    if(game.currentBoard[ev.target.parentNode.id.split('-')[0]][ev.target.parentNode.id.split('-')[1]] !== false){
      game.currentBoard[ev.target.parentNode.id.split('-')[0]][ev.target.parentNode.id.split('-')[1]] = f;
      // ev.target.parentNode.textContent = $('#'+ ev.target.id).attr( "alt") ;
    }
  }
  ev.dataTransfer.setData("dragged-id", ev.target.id);
  ev.dataTransfer.setData("value", ev.target.textContent);
}

function drop(ev) {
  var data = ev.dataTransfer.getData("dragged-id");
  var valueSpanElement = ev.dataTransfer.getData("value");
  if (ev.target.parentNode.id === "tileHolder") {
    ev.target.parentNode.appendChild(document.getElementById(data));
  } else if (ev.target.parentNode.id === "board"){
    var tile = {value: valueSpanElement, position: ev.target.id, id: data, specialCell: ev.target.textContent};
    ev.target.textContent !== "" ? $('#'+ data).attr( "alt", ev.target.textContent )  : "";
    ev.target.textContent = '';
    ev.target.appendChild(document.getElementById(data));
    game.currentBoard[ev.target.id.split('-')[0]][ev.target.id.split('-')[1]] = tile;
    game.word.unshift(tile);
    allowDropOnCell();
  }
}


//function to create the board of the game.
function createBoard ()  {
  for(var i = 0; i < game.boardGrid.length; i++) {
    var boardGrids = game.boardGrid[i];
    for(var j = 0; j < boardGrids.length; j++) {
      var cellN = $("<div>").addClass('cellN');
      var cellG = $("<div>").addClass('cellG').text("DL");
      var cellB = $("<div>").addClass('cellB').text('TL');
      var cellY = $("<div>").addClass('cellY').text("DW");
      var cellR = $("<div>").addClass('cellR').text("TW");
      var cellS = $("<div>").addClass('cellS').attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)').text("S");
      if (game.boardGrid[i][j] === 'n') {$('#board').append(cellN.attr('id', i+'-'+j));}
      else if (game.boardGrid[i][j] === 'G') {$('#board').append(cellG.attr('id', i+'-'+j));}
      else if (game.boardGrid[i][j] === 'B') {$('#board').append(cellB.attr('id', i+'-'+j));}
      else if (game.boardGrid[i][j] === 'Y') {$('#board').append(cellY.attr('id', i+'-'+j));}
      else if (game.boardGrid[i][j] === 'R') {$('#board').append(cellR.attr('id', i+'-'+j));}
      else {$('#board').append(cellS.attr('id', i+'-'+j));}
    }
  }
}
