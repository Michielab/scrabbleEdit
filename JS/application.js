var t = true;
var f = false;
var b = false;
var Scrabble = function(name,namePlayerTwo){
  this.boardGrid = [
['B','n','n','n','R','n','n','G','n','n','R','n','n','n','B',],
['n','G','n','n','n','B','n','n','n','B','n','n','n','G','n'],
['n','n','Y','n','n','n','G','n','G','n','n','n','Y','n','n'],
['n','n','n','B','n','n','n','Y','n','n','n','B','n','n','n'],
['R','n','n','n','Y','n','G','n','G','n','Y','n','n','n','R'],
['n','B','n','n','n','B','n','n','n','B','n','n','n','B','n'],
['n','n','G','n','G','n','n','n','n','n','G','n','G','n','n'],
['G','n','n','Y','n','n','n','S','n','n','n','Y','n','n','G'],
['n','n','G','n','G','n','n','n','n','n','G','n','G','n','n'],
['n','B','n','n','n','B','n','n','n','B','n','n','n','n','n'],
['R','n','n','n','Y','n','G','n','G','n','Y','n','n','n','R'],
['n','n','n','B','n','n','n','Y','n','n','n','B','n','n','n'],
['n','n','Y','n','n','n','G','n','G','n','n','n','Y','n','n'],
['n','G','n','n','n','B','n','n','n','B','n','n','n','G','n'],
['B','n','n','n','R','n','n','G','n','n','R','n','n','n','B'],
],
  this.currentBoard = [
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
[f,f,f,f,f,f,f,f,f,f,f,f,f,f,f],
],
this.playerOne = {"name": "playerOne", "score": 0,"tiles": []},
this.playerTwo = {"name": "playerTwo", "score": 0,"tiles": []},
this.tiles = ['A,1','A,1','A,1','A,1','A,1','A,1','A,1','A,1','A,1','B,3','B,3',
'C,3','C,3','D,2','D,2','D,2','D,2','E,1','E,1','E,1','E,1','E,1','E,1','E,1','E,1','E,1','E,1','E,1','E,1',
'F,4','F,4','G,2','G,2','G,2','H,4','H,4','I,1','I,1','I,1','I,1','I,1','I,1','I,1','I,1','I,1','J,8','K,5','L,1','L,1','L,1','L,1',
'M,3','M,3','N,1','N,1','N,1','N,1','N,1','N,1','O,1','O,1','O,1','O,1','O,1','O,1','O,1','O,1','P,3','P,3','Q,10',
'R,1','R,1','R,1','R,1','R,1','R,1','S,1','S,1','S,1','S,1','T,1','T,1','T,1','T,1','T,1','T,1','U,1','U,1','U,1','U,1',
'V,4','V,4','W,4','W,4','X,8','Y,4','Y,4','Z,10'],
this.playerTurn = this.playerOne,
this.word = [],
this.swapLetters = [],
this.temporaryPoints = 0,
this.incorrectWord = false
};

Scrabble.prototype.drawTileToStart = function() {
  var randomLetter = this.tiles[Math.floor(Math.random()*this.tiles.length)];
  return randomLetter;
};

Scrabble.prototype.shuffleTiles = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

Scrabble.prototype.takeTile = function() {
   var randomTile = this.shuffleTiles(this.tiles).pop();
   var letter = randomTile.split(',')[0];
   var letterValue = parseInt(randomTile.split(',')[1]);
   var tile = {title: letter, id: this.tiles.length, points: letterValue};
   if (this.tiles.length !== 0) {
     this.playerTurn.tiles.push(tile);
   }
};

Scrabble.prototype.fillArrayOfLetters = function() {
  for (var i = 0; this.playerTurn.tiles.length < 7; i++) {
      this.takeTile();
  }
};

Scrabble.prototype.takeLetterBack = function(position,tile){
  if(this.word.indexOf(position) !== -1) {
    this.word.splice(this.word.indexOf(position),1);
  }
};

Scrabble.prototype.letterSwap = function(){
  this.playerTurn.tiles.forEach((letter,index)=>{
     this.tiles.push(letter.title);
  });
  this.playerTurn.tiles = [];
};

Scrabble.prototype.sortWordArray = function() {
  this.word.sort((a,b) => {
    return (a.position.split("-")[0] + a.position.split("-")[1]) - (b.position.split("-")[0] + b.position.split("-")[1]);
  });
};

Scrabble.prototype.checkWords = function() {
  // this.incorrectWord = false;
  this.sortWordArray();
  console.log("checkWords",this.word);
  var startPositionLeft = this.word[0];
  var startPositionTop = this.word[0];
  if(this.currentBoard[startPositionLeft.position.split("-")[0]][parseInt(startPositionLeft.position.split('-')[1]) - 1] !== f){
  for(var i = 0; this.currentBoard[parseInt(this.word[0].position.split("-")[0])][parseInt(this.word[0].position.split('-')[1]) - i] !== f;i++){
    startPositionLeft.position = this.word[0].position.split('-')[0] + "-" + (parseInt(this.word[0].position.split('-')[1]) - i);
  }}
  else if(this.currentBoard[parseInt(startPositionTop.position.split("-")[0]) - 1][parseInt(startPositionTop.position.split('-')[1])] !== f){
  for(var j = 0; this.currentBoard[parseInt(this.word[0].position.split("-")[0]) - j][parseInt(this.word[0].position.split('-')[1])] !== f;j++){
    startPositionTop.position = (parseInt(this.word[0].position.split('-')[0]) - j )+ "-" + (parseInt(this.word[0].position.split('-')[1]));
  }}
  console.log(startPositionTop);
   this.currentBoard[startPositionLeft.position.split("-")[0]][parseInt(startPositionLeft.position.split('-')[1]) + 1] !== f ? this.checkLeftToRight(startPositionLeft):"";
   this.currentBoard[parseInt(startPositionTop.position.split("-")[0]) + 1][parseInt(startPositionTop.position.split('-')[1])] !== f ? this.checkTopToButtom(startPositionTop):"";
};

Scrabble.prototype.checkLeftToRight = function(startPositionLeft) {
  var wordArray = [];
  for(var i = 0; this.currentBoard[parseInt(startPositionLeft.position.split("-")[0])][parseInt(startPositionLeft.position.split('-')[1]) + i] !== f;i++){
    wordArray.push(this.currentBoard[startPositionLeft.position.split("-")[0]][parseInt(startPositionLeft.position.split('-')[1]) + i]);
  }
  this.checkIfWordIsCorrect(wordArray);
};

Scrabble.prototype.checkTopToButtom = function(startPositionTop) {
  var wordArray = [];
  for(var i = 0; this.currentBoard[parseInt(startPositionTop.position.split("-")[0]) + i][parseInt(startPositionTop.position.split('-')[1])] !== f;i++){
    wordArray.push(this.currentBoard[parseInt(startPositionTop.position.split("-")[0]) + i][parseInt(startPositionTop.position.split('-')[1])]);
  }
  this.checkIfWordIsCorrect(wordArray);
};


Scrabble.prototype.checkIfWordIsCorrect = function(wordArray) {
  var word = wordArray.map((element)=>{
    return element.value.toLowerCase();
  });
  allWords.indexOf(word.join('')) !== -1 ? this.getPoints(wordArray) : this.incorrectWord = true;
};

Scrabble.prototype.getPoints = function(word) {
  console.log("word",word);
 var score = 0;
 word.forEach((letter)=>{
   this.removeTilesFromPlayerArray(letter);
  switch(letter.value){
    case "A":
    case "E":
    case "I":
    case "O":
    case "U":
    case "L":
    case "N":
    case "S":
    case "T":
    case "R":
    score++;
    break;
    case "D":
    case "G":
    score += 2;
    break;
    case "B":
    case "C":
    case "M":
    case "P":
    score += 3;
    break;
    case "F":
    case "H":
    case "V":
    case "W":
    case "Y":
    score += 4;
    break;
    case "K":
    score += 5;
    break;
    case "J":
    case "X":
    score += 8;
    break;
    case "Q":
    case "Z":
    score += 10;
    break;
  }
 });
 this.temporaryPoints += score;
 this.word = [];
};

Scrabble.prototype.removeTilesFromPlayerArray = function(letter) {
  game.playerTurn.tiles = game.playerTurn.tiles.filter((tileObject)=>{
  return tileObject.id !== parseInt(letter.id);
  });
};

Scrabble.prototype.addScore = function() {
 this.playerTurn.score += this.temporaryPoints;
 this.temporaryPoints = 0;
};

Scrabble.prototype.changePlayer = function() {
  this.playerTurn.name === "playerOne" ? this.playerTurn = this.playerTwo : this.playerTurn = this.playerOne;
};
