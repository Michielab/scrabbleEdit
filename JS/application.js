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
this.incorrectWord = false,
this.horizontal = false
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
  for (var i = this.playerTurn.tiles.length; this.playerTurn.tiles.length < 7; i++) {
      this.takeTile();
  }
};

Scrabble.prototype.takeLetterBack = function(position,tile){
  if(this.word.indexOf(position) !== -1) {
    this.word.splice(this.word.indexOf(position),1);
  }
};

Scrabble.prototype.letterSwap = function(){
  var swapArray = [];
  this.swapLetters.length !== 0 ? swapArray = this.swapLetters : swapArray = this.playerTurn.tiles ;
  swapArray.forEach((letter,index)=>{
     this.tiles.push(letter.title + ","+letter.points);
  });
  this.swapLetters.length === 0 ? this.playerTurn.tiles = [] : "";
  this.swapLetters = [];
};

Scrabble.prototype.sortWordArray = function() {
return this.word.sort((a,b) => {
    return (a.position.split("-")[0] + a.position.split("-")[1]) - (b.position.split("-")[0] + b.position.split("-")[1]);
  });
};

Scrabble.prototype.checkWords = function() {
  this.sortWordArray();
  var startPosition = this.word[0];
  if(this.word.length > 1){  this.word[0].position.split("-")[0] === this.word[1].position.split("-")[0] ? this.horizontal = true : this.horizontal = false;
}
  this.getMostLeftPostion(startPosition);
  this.getTopPosition(startPosition);
};


Scrabble.prototype.getMostLeftPostion = function(startPosition) {
  console.log(startPosition);
  if(this.currentBoard[startPosition.position.split("-")[0]][parseInt(startPosition.position.split('-')[1]) - 1] !== f){
  for(var i = 0; this.currentBoard[parseInt(this.word[0].position.split("-")[0])][parseInt(this.word[0].position.split('-')[1]) - i] !== f;i++){
    startPosition.position = this.word[0].position.split('-')[0] + "-" + (parseInt(this.word[0].position.split('-')[1]) - i);
  }}
   this.currentBoard[startPosition.position.split("-")[0]][parseInt(startPosition.position.split('-')[1]) + 1] !== f ? this.checkLeftToRight(startPosition):"";
};

Scrabble.prototype.getTopPosition = function(startPosition) {
  if(this.currentBoard[parseInt(startPosition.position.split("-")[0]) - 1][parseInt(startPosition.position.split('-')[1])] !== f){
  for(var j = 0; this.currentBoard[parseInt(this.word[0].position.split("-")[0]) - j][parseInt(this.word[0].position.split('-')[1])] !== f;j++){
    startPosition.position = (parseInt(this.word[0].position.split('-')[0]) - j )+ "-" + (parseInt(this.word[0].position.split('-')[1]));
  }}
   this.currentBoard[parseInt(startPosition.position.split("-")[0]) + 1][parseInt(startPosition.position.split('-')[1])] !== f ? this.checkTopToButtom(startPosition):"";
};

Scrabble.prototype.checkLeftToRight = function(startPosition) {
  var wordArray = [];
  for(var i = 0; this.currentBoard[parseInt(startPosition.position.split("-")[0])][parseInt(startPosition.position.split('-')[1]) + i] !== f;i++) {
    wordArray.push(this.currentBoard[startPosition.position.split("-")[0]][parseInt(startPosition.position.split('-')[1]) + i]);
  }
  this.checkIfWordIsCorrect(wordArray);
};

Scrabble.prototype.checkTopToButtom = function(startPosition) {
  var wordArray = [];
  for(var i = 0; this.currentBoard[parseInt(startPosition.position.split("-")[0]) + i][parseInt(startPosition.position.split('-')[1])] !== f;i++){
    wordArray.push(this.currentBoard[parseInt(startPosition.position.split("-")[0]) + i][parseInt(startPosition.position.split('-')[1])]);
  }
  this.checkIfWordIsCorrect(wordArray);
};

Scrabble.prototype.checkEveryLetterForVerticalWords = function() {
  for(var i = 1;i < this.word.length; i++){
    console.log("getTopPosition", this.word[i]);
    this.getTopPosition(this.word[i]);
  }
};

Scrabble.prototype.checkEveryLetterForHorizontalWords = function() {
  console.log("horizontal",this.word);
  for(var i = 1;i < this.word.length; i++){
    console.log("checkEveryLetterForHorizontalWords", this.word[i]);
    this.getMostLeftPostion(this.word[i]);
  }
};

Scrabble.prototype.checkIfWordIsCorrect = function(wordArray) {
  var word = wordArray.map((element)=>{
    return element.value.split('')[0].toLowerCase();
  });
  allWords.indexOf(word.join('')) !== -1 ? this.getPoints(wordArray) : this.incorrectWord = true;
};

Scrabble.prototype.getPoints = function(word) {
 var score = 0;
 var timesWord = 1;
 word.forEach((letter)=>{
   this.removeTilesFromPlayerArray(letter);
   if(letter.specialCell) {
     if(letter.specialCell === "DL"|| letter.specialCell === "S") {
       score += (parseInt(letter.value.split('')[1]) * 2);
     } else if (letter.specialCell === "TL") {
       score += (parseInt(letter.value.split('')[1]) * 3);
     } else if (letter.specialCell === "DW")  {
       timesWord += 2;
     } else if (letter.specialCell === "TW")  {
       timesWord += 3;
     }
     letter.specialCell = "";
   } else {
     score += parseInt(letter.value.split('')[1]);
   }
 });
 score *= timesWord;
 this.temporaryPoints += score;
};

Scrabble.prototype.removeTilesFromPlayerArray = function(letter) {
  game.playerTurn.tiles = game.playerTurn.tiles.filter((tileObject)=>{
  return tileObject.id !== parseInt(letter.id);
  });
};

Scrabble.prototype.addScore = function() {
 this.word = [];
 this.playerTurn.score += this.temporaryPoints;
 this.temporaryPoints = 0;
 this.horizontal = false;
};

Scrabble.prototype.replay = function() {
  this.temporaryPoints = 0;
  this.incorrectWord = false;
  this.horizontal = false;
};

Scrabble.prototype.changePlayer = function() {
  this.playerTurn.name === "playerOne" ? this.playerTurn = this.playerTwo : this.playerTurn = this.playerOne;
};
