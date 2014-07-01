var _ = require("underscore");

function TicTacToeGame(board){ 
  this.board = board ? board : [[],[],[]];
  this.playsLeft = true; 
  this.winner = undefined;
} 

TicTacToeGame.prototype.toJson = function (){ 
  return JSON.stringify({board:this.board, playsLeft:this.playsLeft, winner:this.winner}); 
}

TicTacToeGame.prototype.fromJson = function (jsonString){ 
  this.board = JSON.parse(jsonString).board;
  this.playsLeft = JSON.parse(jsonString).playsLeft;
  this.winner = JSON.parse(jsonString).winner;
}

TicTacToeGame.prototype.printBoard = function (){ 
  for (var i=0; i<3; i++){
    var line = "";
    for (var j=0; j<3; j++){ 
      line += this.board[i][j]+" ";
    } 
    console.log(line);
  }
}

TicTacToeGame.prototype.playOnCurrentGame = function (move){ 
  if (isValidMove(move) && !this.board[move.xCoord][move.yCoord]){ 
    this.board[move.xCoord][move.yCoord] = 'O';
    if (findWin(this.board) == 'O'){
      this.playsLeft = false;
      this.winner = 'O';
      return;
    }

    var xPlay = this.findBestNextMove();
    if (xPlay){ 
      this.board[xPlay.xCoord][xPlay.yCoord] = 'X';
      if (findWin(this.board) == 'X'){
        this.playsLeft = false;
        this.winner = 'X';
      }  
    } else { 
      this.playsLeft = false;
    }
  }   
}


function isValidMove(move){ 
  return move.xCoord <= 2 && move.yCoord <=2;
}

//decided to loop only once to look at rows and columns for efficency - tradeoff is you have to keep track of more variables
function findWin(board){ 
  var diagOneOCount = 0;
  var diagOneXCount = 0;
  var diagTwoOCount = 0;
  var diagTwoXCount = 0;

  for (var i=0; i<3; i++){ 
    var oRowCount = 0;
    var oColumnCount = 0;
    var xRowCount = 0;
    var xColumnCount = 0;

    if (board[i][i]=== 'O') diagOneOCount++;
    if (board[i][i]=== 'X') diagOneXCount++;
    if (board[i][2-i]=== 'O') diagTwoOCount++;
    if (board[i][2-i]=== 'X') diagTwoXCount++;

    for (var j=0; j<3; j++){ 
      if (board[i][j]==='O') oRowCount++;
      if (board[i][j]==='X') xRowCount++;
      if (board[j][i]==='O') oColumnCount++;
      if (board[j][i]==='X') xColumnCount++;
    }
    if (oRowCount==3 || oColumnCount==3 || diagOneOCount==3 || diagTwoOCount==3){
      return 'O';
    }
    if (xRowCount==3 || xColumnCount==3 || diagOneXCount==3 || diagTwoXCount==3){
      return 'X'; 
    }
  }
  return undefined;
}

TicTacToeGame.prototype.findBestNextMove = function (){ 
  if (!this.board[1][1]){ 
    return {xCoord: 1, yCoord: 1}; //start in the middle if it's available
  }
  var emptySpaces = findEmptySpaces(this.board);
  if (emptySpaces.length > 0) { 
    var nextBestMove = bestPlayInMoveOrderPermutations([], emptySpaces, this.board, {});
    return {xCoord: parseInt(nextBestMove.split(",")[0]), yCoord: parseInt(nextBestMove.split(",")[1])};
  }
  return undefined; //no moves left
}

function bestPlayInMoveOrderPermutations (permutation, possibleMoves, board, bestMoveMap){ 
  var n = possibleMoves.length;
  if (n == 0){ //no more moves to re-arrange
    var nextMove = permutation[0];
    var permutationScore = evaluatePermutation(permutation, board);
    bestMoveMap[nextMove] = bestMoveMap[nextMove] ? bestMoveMap[nextMove] + permutationScore : permutationScore;
  } else { 
    for (var i=0; i<n; i++){ 
      bestPlayInMoveOrderPermutations(permutation.concat([possibleMoves[i]]), 
                possibleMoves.slice(0,i).concat(possibleMoves.slice(i+1,possibleMoves.length)), 
                board, 
                bestMoveMap);
      
    }
  }
  return findBestPlay(bestMoveMap);
}

function findBestPlay(moveMap){ 
  var max = Number.NEGATIVE_INFINITY;
  var bestPlay;
  for (var key in moveMap) {
    if (max < moveMap[key]) {
      max = moveMap[key];
      bestPlay = key;
    }
  }
  return bestPlay;
}

function evaluatePermutation(moves, board){ 
  var cloned = deepCopy(board);
  var xMove = true;

  for (var i=0; i<moves.length; i++){
    cloned[moves[i][0]][moves[i][1]] = xMove ? 'X' : 'O';

    var winner = findWin(cloned);
    if (winner == 'X') return 10 - i;
    if (winner == 'O') return i - 10;

    xMove = !xMove;
  }
  return 1; //tie game
}

// = assignment will just reference old object
//modificatations to new array will also change old array
function deepCopy(board){
  var copied = [[],[],[]];
  for (var i=0; i<3; i++){ 
    for (var j=0; j<3; j++){
      copied[i][j] = board[i][j];
    }
  }
  return copied; 
}

function findEmptySpaces (board){ 
  var emptySpaces = [];
  for (var i=0; i<3; i++){ 
    for (var j=0; j<3; j++){
      if (!board[i][j]){ 
        emptySpaces.push([i,j]);
      }
    }
  }
  return emptySpaces;
}

module.exports = TicTacToeGame;
