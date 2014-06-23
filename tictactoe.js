function TicTacToeGame(){ 
  this.board = [[],[],[]];
} 

TicTacToeGame.prototype.toJson = function (){ 
  return JSON.stringify(this.board); 
}

TicTacToeGame.prototype.fromJson = function (jsonString){ 
  this.board = JSON.parse(jsonString);
}

TicTacToeGame.prototype.playOnCurrentGame = function (move){ 
  if (isValidMove(move) && !this.board[move.xCoord][move.yCoord]){ 
    //place O move 
    this.board[move.xCoord][move.yCoord] = 'O';

    this.board = makeAiPlay(this.board);
  }   
}

TicTacToeGame.prototype.determineGameState = function (){ 
  //this.board
  //return {playsLeft:true,winner:}
  //return {playsLeft:false,winner:X}
  //return {playsLeft:false,winner:O}
}

function makeAiPlay(board){ 
  var winningPlay = findWinningPlay(board);

  if (winningPlay){ 
    board[winningPlay.xCoord][winningPlay.yCoord] = 'X';
  } else { 
      var defensivePlay = findDefensivePlay(board);
      if (defensivePlay){ 
        board[defensivePlay.xCoord][defensivePlay.yCoord] = 'X';
      } else { 
        gamboard = makeOffensivePlay(board);
      }
  }

  return board;
}

/*function newboard(){ 
  return [[],[],[]];
}*/

function isValidMove(move){ 
  return move.xCoord <= 2 && move.yCoord <=2;
}

function findWinningPlay(board){ 
  var winningPlayRowsColumns = findRowOrColumnCompletingPlay(board, 'X');
  var winningDiagonalPlay = findDiagonalCompletingPlay(board,'X');
  
  if (winningPlayRowsColumns){ 
    return winningPlayRowsColumns;
  }
  if (winningDiagonalPlay){ 
    return winningDiagonalPlay;
  }
}

function findDefensivePlay(board){ 
  var defensivePlayRowsColumns = findRowOrColumnCompletingPlay(board, 'O');
  var defensivePlayDiagnol = findDiagonalCompletingPlay(board, 'O');

  if (defensivePlayRowsColumns){ 
    return defensivePlayRowsColumns;
  }
  if (defensivePlayDiagnol){ 
    return defensivePlayDiagnol;
  }
}

//decided to loop only once to look at rows and columns for efficency - tradeoff is you have to keep track of more variables
function findRowOrColumnCompletingPlay(board, pieceToLookFor){ 
  for (var i=0; i<3; i++){ 
    var rowCount = 0;
    var columnCount = 0;
    var rowOpening;
    var columnOpening;

    for (var j=0; j<3; j++){ 
      //look at row & diagonals
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

    if (rowCount == 2){ 
      return rowOpening;
    } 
    if (columnCount == 2){ 
      return columnOpening;
    } 
  }
}

//started with this logic in with row & column checks, but it was too messy 
function findDiagonalCompletingPlay(board, pieceToLookFor){ 
  var oDiagOneCount = 0;
  var oDiagTwoCount = 0;
  var diagOneOpening;
  var diagTwoOpening;

  for (var i=0; i<3; i++){ 
      if (board[i][i]===pieceToLookFor){ 
        oDiagOneCount++;
      } else if (!board[i][i]){ 
        diagOneOpening = {xCoord:i, yCoord:i};
      }
      if (board[i][2-i]===pieceToLookFor){ 
        oDiagTwoCount++;
      } else if (!board[i][2-i]){ 
        diagTwoOpening = {xCoord:i, yCoord:2-i};
      }
    }

    if (oDiagOneCount == 2){ 
      return diagOneOpening;
    } 
    if (oDiagTwoCount == 2){ 
      return diagTwoOpening;
    }
  
}

function makeOffensivePlay(board){
  var orderedPossibleMoves = [{x:1,y:1},{x:0,y:1},{x:2,y:1},{x:1,y:0},{x:0,y:0},{x:2,y:2},{x:0,y:2},{x:1,y:2},{x:2,y:2}];
  for (var i=0; i<orderedPossibleMoves.length; i++){ 
    if (!board[orderedPossibleMoves[i].x][orderedPossibleMoves[i].y]){ 
      board[orderedPossibleMoves[i].x][orderedPossibleMoves[i].y] = 'X';
      break;
    }  
  }
  return board;
}

module.exports = TicTacToeGame;
