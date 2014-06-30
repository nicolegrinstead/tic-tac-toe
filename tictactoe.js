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
    if (checkForWin(this.board, 'O')){
      this.playsLeft = false;
      this.winner = 'O';
      return;
    }

    var xPlay = this.findBestNextMove();
    this.board[xPlay.xCoord][xPlay.yCoord] = 'X';
    //this.makeAiPlay();

  }   
}

TicTacToeGame.prototype.makeAiPlay = function (){ 
  var winningPlay = findWinningPlay(this.board);

  if (winningPlay){ 
    this.board[winningPlay.xCoord][winningPlay.yCoord] = 'X';
    this.playsLeft = false;
    this.winner = 'X';
  } else { 
      var defensivePlay = findDefensivePlay(this.board);
      if (defensivePlay){ 
        this.board[defensivePlay.xCoord][defensivePlay.yCoord] = 'X';
      } else { 
        var offensivePlay = findOffensivePlay(this.board);
        if (offensivePlay) { 
          this.board[offensivePlay.xCoord][offensivePlay.yCoord] = 'X';
        } else {  // no moves left!
          this.playsLeft = false;
        }
      }
  }
}

function isValidMove(move){ 
  return move.xCoord <= 2 && move.yCoord <=2;
}

function checkForWin(board, pieceToLookFor){ 
  return findRowOrColumnCompletingPlay(board, pieceToLookFor).win || findDiagonalCompletingPlay(board, pieceToLookFor).win;
}

function findWinningPlay(board){ 
  var winningPlayRowsColumns = findRowOrColumnCompletingPlay(board,'X').opening;
  if (winningPlayRowsColumns){ 
    return winningPlayRowsColumns;
  }

  var winningDiagonalPlay = findDiagonalCompletingPlay(board,'X').opening;
  if (winningDiagonalPlay){ 
    return winningDiagonalPlay;
  }
}

function findDefensivePlay(board){ 
  var defensivePlayRowsColumns = findRowOrColumnCompletingPlay(board, 'O').opening;
  if (defensivePlayRowsColumns){ 
    return defensivePlayRowsColumns;
  }

  var defensivePlayDiagnol = findDiagonalCompletingPlay(board, 'O').opening;
  if (defensivePlayDiagnol){ 
    return defensivePlayDiagnol;
  }
}

//decided to loop only once to look at rows and columns for efficency - tradeoff is you have to keep track of more variables
function findRowOrColumnCompletingPlay(board, pieceToLookFor){ 
  for (var i=0; i<3; i++){ 
    var rowCount = 0;
    var columnCount = 0;
    var rowOpening = undefined;
    var columnOpening = undefined;

    for (var j=0; j<3; j++){ 
      //look at row 
      if (board[i][j]===pieceToLookFor){ 
        rowCount++;
      } else if (!board[i][j]){ 
        rowOpening = {xCoord:i, yCoord:j};
      }
      //look at column
      if (board[j][i]===pieceToLookFor){ 
        columnCount++;
      } else if (!board[j][i]){ 
        columnOpening = {xCoord:j, yCoord:i};
      }
    }
    if (rowCount == 2 && rowOpening){ 
      return {opening:rowOpening, win:undefined};
    } 
    if (columnCount == 2 && columnOpening){
      return {opening:columnOpening, win:undefined};
    } 
    if (rowCount==3 || columnCount==3){
      return {opening:undefined, win:true}; 
    }
  }
  return {opening:undefined, win:undefined};
}

//started with this logic in with row & column checks, but it was too messy 
function findDiagonalCompletingPlay(board, pieceToLookFor){ 
  var diagOneCount = 0;
  var diagTwoCount = 0;
  var diagOneOpening = undefined;
  var diagTwoOpening = undefined;

  for (var i=0; i<3; i++){ 
    if (board[i][i]===pieceToLookFor){ 
      diagOneCount++;
    } else if (!board[i][i]){ 
      diagOneOpening = {xCoord:i, yCoord:i};
    }
    if (board[i][2-i]===pieceToLookFor){ 
      diagTwoCount++;
    } else if (!board[i][2-i]){ 
      diagTwoOpening = {xCoord:i, yCoord:2-i};
    }
  }
  if (diagOneCount==3 || diagTwoCount==3){
    return {opening:undefined, win:true}; 
  }
  if (diagOneCount == 2){ 
    return {opening:diagOneOpening, win:undefined};
  } 
  if (diagTwoCount == 2){ 
    return {opening:diagTwoOpening, win:undefined};
  }

  return {opening:undefined, win:undefined};
}

function findOffensivePlay(board){
  if (board[1][1] === 'O'){ //strategy if O starts in the middle
    var orderedPossibleMoves = [{x:0,y:0},{x:0,y:1},{x:2,y:1},{x:1,y:0},{x:2,y:2},{x:0,y:2},{x:1,y:2},{x:2,y:2}];
  } else { 
    var orderedPossibleMoves = [{x:1,y:1},{x:0,y:1},{x:2,y:1},{x:1,y:0},{x:0,y:0},{x:2,y:2},{x:0,y:2},{x:1,y:2},{x:2,y:2}];
  }
  for (var i=0; i<orderedPossibleMoves.length; i++){ 
    if (!board[orderedPossibleMoves[i].x][orderedPossibleMoves[i].y]){ 
      return {xCoord:orderedPossibleMoves[i].x, yCoord:orderedPossibleMoves[i].y};
    }  
  }
}

//min max for win 
TicTacToeGame.prototype.findBestNextMove = function (){ 
  var returned = moveOrderPermutations([], emptySpaces(this.board), this.board, {});
  //console.log(returned);
  return {xCoord: parseInt(returned.split(",")[0]), yCoord: parseInt(returned.split(",")[1])};
}

//alternate xs and os until you come to an end
function moveOrderPermutations (permutation, possibleMoves, board, bestMoveMap){ 
  var n = possibleMoves.length;
  if (n == 0){ //no moves left
    var nextMove = permutation[0];
    var permutationScore = evaluatePermutation(permutation, board);
    bestMoveMap[nextMove] = bestMoveMap[nextMove] ? bestMoveMap[nextMove] + permutationScore : permutationScore;
    //console.log(permutation);
  } else { 
    for (var i=0; i<n; i++){ 
      moveOrderPermutations(permutation.concat([possibleMoves[i]]), 
                possibleMoves.slice(0,i).concat(possibleMoves.slice(i+1,possibleMoves.length)), 
                board, 
                bestMoveMap);
      
    }
  }
  //console.log(bestMoveMap);
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
    var score = getScore(cloned, i);
    if (score){ 
      return score;
    }
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

function getScore (board, depth){
  if (checkForWin(board, 'X')) { 
    return 10 - depth;
  } else if (checkForWin(board, 'O')) { 
    return depth - 10;
  } 
  return 0; 
}

function emptySpaces (board){ 
  var emptySpaces = [];
  for (var i=0; i<3; i++){ 
    for (var j=0; j<3; j++){
      if (!board[i][j]){ 
        emptySpaces.push([i,j]);
      }
    }
  }
  //console.log("empties " + emptySpaces);
  return emptySpaces;
}

module.exports = TicTacToeGame;
