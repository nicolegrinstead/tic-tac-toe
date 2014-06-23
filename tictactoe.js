function playOnCurrentGame(gameBoard, move){ 
  if (!isValidMove(move) || gameBoard[move.xCoord][move.yCoord]){ 
    return gameBoard;
  }

  //place O move 
  gameBoard[move.xCoord][move.yCoord] = 'O';

  //board is returned so that it's clear that board was modifed
  return makeAiPlay(gameBoard);
}

function determineGameState(gameBoard){ 
  //return {playsLeft:true,winner:}
  //return {playsLeft:false,winner:X}
  //return {playsLeft:false,winner:O}
}

function makeAiPlay(gameBoard){ 
  var winningPlay = findWinningPlay(gameBoard);

  if (winningPlay){ 
    gameBoard[winningPlay.xCoord][winningPlay.yCoord] = 'X';
  } else { 
      var defensivePlay = findDefensivePlay(gameBoard);
      if (defensivePlay){ 
        gameBoard[defensivePlay.xCoord][defensivePlay.yCoord] = 'X';
      } else { 
        gamboard = makeOffensivePlay(gameBoard);
      }
  }

  return gameBoard;
}

function newGameBoard(){ 
  return [[],[],[]];
}

function isValidMove(move){ 
  return move.xCoord <= 2 && move.yCoord <=2;
}

function findWinningPlay(gameBoard){ 
  var winningPlayRowsColumns = findRowOrColumnCompletingPlay(gameBoard, 'X');
  var winningDiagonalPlay = findDiagonalCompletingPlay(gameBoard,'X');
  
  if (winningPlayRowsColumns){ 
    return winningPlayRowsColumns;
  }
  if (winningDiagonalPlay){ 
    return winningDiagonalPlay;
  }
}

function findDefensivePlay(gameBoard){ 
  var defensivePlayRowsColumns = findRowOrColumnCompletingPlay(gameBoard, 'O');
  var defensivePlayDiagnol = findDiagonalCompletingPlay(gameBoard, 'O');

  if (defensivePlayRowsColumns){ 
    return defensivePlayRowsColumns;
  }
  if (defensivePlayDiagnol){ 
    return defensivePlayDiagnol;
  }
}
//decided to loop only once to look at rows and columns for efficency - tradeoff is you have to keep track of more variables
function findRowOrColumnCompletingPlay(gameBoard, pieceToLookFor){ 
  for (var i=0; i<3; i++){ 
    var rowCount = 0;
    var columnCount = 0;
    var rowOpening;
    var columnOpening;

    for (var j=0; j<3; j++){ 
      //look at row & diagonals
      if (gameBoard[i][j]===pieceToLookFor){ 
        rowCount++;
      } else if (!gameBoard[i][j]){ 
        rowOpening = {xCoord:i, yCoord:j};
      }
      //look at column
      if (gameBoard[j][i]===pieceToLookFor){ 
        columnCount++;
      } else if (!gameBoard[j][i]){ 
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

//started with this logic in with other checks, but it was too messy
function findDiagonalCompletingPlay(gameBoard, pieceToLookFor){ 
  var oDiagOneCount = 0;
  var oDiagTwoCount = 0;
  var diagOneOpening;
  var diagTwoOpening;

  for (var i=0; i<3; i++){ 
      if (gameBoard[i][i]===pieceToLookFor){ 
        oDiagOneCount++;
      } else if (!gameBoard[i][i]){ 
        diagOneOpening = {xCoord:i, yCoord:i};
      }
      if (gameBoard[i][2-i]===pieceToLookFor){ 
        oDiagTwoCount++;
      } else if (!gameBoard[i][2-i]){ 
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

function makeOffensivePlay(gameBoard){
  var orderedPossibleMoves = [{x:1,y:1},{x:0,y:1},{x:2,y:1},{x:1,y:0},{x:0,y:0},{x:2,y:2},{x:0,y:2},{x:1,y:2},{x:2,y:2}];
  for (var i=0; i<orderedPossibleMoves.length; i++){ 
    if (!gameBoard[orderedPossibleMoves[i].x][orderedPossibleMoves[i].y]){ 
      gameBoard[orderedPossibleMoves[i].x][orderedPossibleMoves[i].y] = 'X';
      break;
    }  
  }
  return gameBoard;
}

exports.newGameBoard = newGameBoard;
exports.playOnCurrentGame = playOnCurrentGame;
