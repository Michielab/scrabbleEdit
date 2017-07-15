var game;
window.onload = function(){
  game = new Scrabble();
  createBoard();
  getTiles();
  hidePlayerBoard();
};

//scoreFunctions
function playWord(){
 game.checkWords();
 console.log(game.incorrectWord);
 game.incorrectWord !== true ? nextTurn() : replay();
}

function nextTurn(){
  removeTiles();
  game.addScore();
  $(`#${game.playerTurn.name}`).text(game.playerTurn.score);
  game.changePlayer();
  hidePlayerBoard();
  getTiles();
}

function replay(){
  game.word = [];
  console.log("incorrectWord");
}


function hidePlayerBoard(){
  game.playerTurn.name === "playerOne" ? $(".playerScoreBoards:eq( 1 )").fadeTo( 1, 0.3): $(".playerScoreBoards:eq( 0 )").fadeTo( 1, 0.3);
}

//game functions
function createBoard ()  {
  for(var i = 0; i < game.boardGrid.length; i++) {
    var boardGrids = game.boardGrid[i];
    for(var j = 0; j < boardGrids.length; j++) {
      var cellN = $("<div>").addClass('cellN').attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)');
      var cellG = $("<div>").addClass('cellG').attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)').text("DL");
      var cellB = $("<div>").addClass('cellB').attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)').text('TL');
      var cellY = $("<div>").addClass('cellY').attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)').text("DW");
      var cellR = $("<div>").addClass('cellR').attr('ondrop','drop(event)').attr('ondragover','allowDrop(event)').text("TW");
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

function removeTiles() {
  game.playerTurn.tiles.forEach((tile)=>{
    $('#' + tile.id).remove();
  });
}

function getTiles() {
  game.fillArrayOfLetters();
  game.playerTurn.tiles.forEach((tile)=>{
    var newTile = $("<span>").addClass('tile').attr( 'id', tile.id).attr('draggable','true').attr('ondragstart','drag(event)').text(tile.title);
    $('#tileHolder').append(newTile);
  });
}

//drag and drop functions
function allowDrop(ev, el) {
  ev.preventDefault();
}


function drag(ev) {
  if(ev.target.parentNode.parentNode.id === "board") {
    if(game.currentBoard[ev.target.parentNode.id.split('-')[0]][ev.target.parentNode.id.split('-')[1]] !== false){
      game.currentBoard[ev.target.parentNode.id.split('-')[0]][ev.target.parentNode.id.split('-')[1]] = f;
      // game.takeLetterBack(ev.target.parentNode.id,ev.target);
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
  } else if (ev.target.nodeName === "DIV"){
    var tile = {value: valueSpanElement, position: ev.target.id, id: data, specialCell: ev.target.textContent};
    ev.target.textContent = '';
    ev.target.appendChild(document.getElementById(data));
    game.currentBoard[ev.target.id.split('-')[0]][ev.target.id.split('-')[1]] = tile;
    game.word.unshift(tile);
    game.playerTurn.tiles = game.playerTurn.tiles.filter((tileObject)=>{
    return tileObject.id !== parseInt(data);
});
  }
}
