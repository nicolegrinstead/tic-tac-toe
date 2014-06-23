function TicTacToeGame(){ 
  this.board = [[],[],[]];
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

TicTacToeGame.prototype.playOnCurrentGame = function (move){ 
  if (isValidMove(move) && !this.board[move.xCoord][move.yCoord]){ 
    this.board[move.xCoord][move.yCoord] = 'O';

    this.makeAiPlay();
  }   
}

TicTacToeGame.prototype.makeAiPlay = function (){ 
  var winningPlay = findWinningPlay(this.board);

  if (winningPlay){ 
    this.board[winningPlay.xCoord][winningPlay.yCoord] = 'X';
    console.log("in winning play");
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
              console.log("no moves");

          this.playsLeft = false;
        }
      }
  }
}

function isValidMove(move){ 
  return move.xCoord <= 2 && move.yCoord <=2;
}

function findWinningPlay(board){ 
  var winningPlayRowsColumns = findRowOrColumnCompletingPlay(board, 'X');
  if (winningPlayRowsColumns){ 
    return winningPlayRowsColumns;
  }

  var winningDiagonalPlay = findDiagonalCompletingPlay(board,'X');
  if (winningDiagonalPlay){ 
    return winningDiagonalPlay;
  }
}

function findDefensivePlay(board){ 
  var defensivePlayRowsColumns = findRowOrColumnCompletingPlay(board, 'O');

  if (defensivePlayRowsColumns){ 
    return defensivePlayRowsColumns;
  }

  var defensivePlayDiagnol = findDiagonalCompletingPlay(board, 'O');
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

      //console.log("column opening is " + columnOpening);
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
      return rowOpening;
    } 
    if (columnCount == 2 && columnOpening){
    //console.log("here " + columnOpening.xCoord + " " + columnOpening.yCoord); 
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

function findOffensivePlay(board){
  var orderedPossibleMoves = [{x:1,y:1},{x:0,y:1},{x:2,y:1},{x:1,y:0},{x:0,y:0},{x:2,y:2},{x:0,y:2},{x:1,y:2},{x:2,y:2}];
  for (var i=0; i<orderedPossibleMoves.length; i++){ 
    if (!board[orderedPossibleMoves[i].x][orderedPossibleMoves[i].y]){ 
      return {xCoord:orderedPossibleMoves[i].x, yCoord:orderedPossibleMoves[i].y};
    }  
  }
}

module.exports = TicTacToeGame;
