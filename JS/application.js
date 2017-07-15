
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
this.tiles = ['A','A','A','A','A','A','A','A','A','B','B',
'C','C','D','D','D','D','E','E','E','E','E','E','E','E','E','E','E','E',
'F','F','G','G','G','H','H','I','I','I','I','I','I','I','I','I','K','L','L','L','L',
'M','M','N','N','N','N','N','N','O','O','O','O','O','O','O','O','P','P','Q',
'R','R','R','R','R','R','S','S','S','S','T','T','T','T','T','T','U','U','U','U',
'V','V','W','W','X','Y','Y','Z'],
this.playerTurn = this.playerOne,
this.word = [],
this.points = 0,
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
   var tile = {title: randomTile, id: this.tiles.length};
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

Scrabble.prototype.sortWordArray = function() {
  this.word.sort((a,b) => {
    return (a.position.split("-")[0] + a.position.split("-")[1]) - (b.position.split("-")[0] + b.position.split("-")[1]);
  });
};

Scrabble.prototype.checkWords = function() {
  this.incorrectWord = false;
  this.sortWordArray();
  var startPositionLeft = this.word[0];
  var startPositionTop = this.word[0];
  if(this.currentBoard[startPositionLeft.position.split("-")[0]][parseInt(startPositionLeft.position.split('-')[1]) - 1] !== f){
  for(var i = 0; this.currentBoard[parseInt(this.word[0].position.split("-")[0])][parseInt(this.word[0].position.split('-')[1]) - i] !== f;i++){
    startPositionLeft.position = this.word[0].position.split('-')[0] + "-" + (parseInt(this.word[0].position.split('-')[1]) - i);
  }}
  else if(this.currentBoard[parseInt(startPositionLeft.position.split("-")[0]) - 1][parseInt(startPositionLeft.position.split('-')[1])] !== f){
  for(var j = 0; this.currentBoard[parseInt(this.word[0].position.split("-")[0]) - j][parseInt(this.word[0].position.split('-')[1])] !== f;j++){
    startPositionTop.position = (parseInt(this.word[0].position.split('-')[0]) - j )+ "-" + (parseInt(this.word[0].position.split('-')[1]));
  }}
   this.currentBoard[startPositionLeft.position.split("-")[0]][parseInt(startPositionLeft.position.split('-')[1]) + 1] !== f ? this.checkLeftToRight(startPositionLeft):"";
   this.currentBoard[parseInt(startPositionLeft.position.split("-")[0]) + 1][parseInt(startPositionLeft.position.split('-')[1])] !== f ? this.checkTopToButtom(startPositionTop):"";
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
  console.log(this.word);
 var score = 0;
 word.forEach((letter)=>{
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


Scrabble.prototype.addScore = function() {
 this.playerTurn.score += this.temporaryPoints;
 this.points = 0;
};

Scrabble.prototype.changePlayer = function() {
  this.playerTurn.name === "playerOne" ? this.playerTurn = this.playerTwo : this.playerTurn = this.playerOne;
};
// for(var i = 1; i < this.currentBoard.length - this.word[0].split('-')[1]; i++) {
//   if(this.currentBoard[this.word[0].split('-')[0]][this.word[0].split('-')[1] - i] !== f) {
//     startPosition = this.word[0].split('-')[0].toString() + "-" + (this.word[0].split('-')[1] - i).toString();
//   }
// }
