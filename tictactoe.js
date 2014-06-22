function playOnCurrentGame(gameBoard, move){ 
  if (!isValidMove(move) || gameBoard[move.xCoord][move.yCoord]){ 
    return gameBoard;
  }

  //place current move 
  gameBoard[move.xCoord][move.yCoord] = 'O';

  //make AI play
  return makeAiPlay(gameBoard);
}

function makeAiPlay(gameBoard){ 
  //make defensive play
  var defensivePlay = findDefensivePlayInRowsAndColumns(gameBoard);
  var defensivePlayDiagnol = findDefensivePlayInDiagonals(gameBoard);

  if (defensivePlay){ 
    gameBoard[defensivePlay.xCoord][defensivePlay.yCoord] = 'X'
  } else if (defensivePlayDiagnol){ 
    gameBoard[defensivePlayDiagnol.xCoord][defensivePlayDiagnol.yCoord] = 'X'
  } else { 
    gamboard = makeOffensivePlay(gameBoard);
  }

  return gameBoard;
}

function newGameBoard(){ 
  return [[],[],[]];
}

function isValidMove(move){ 
  return move.xCoord <= 2 && move.yCoord <=2;
}

//decided to loop only once for efficency - tradeoff is you have to keep track of more variables
function findDefensivePlayInRowsAndColumns(gameBoard){ 
  for (var i=0; i<3; i++){ 
    var oRowCount = 0;
    var oColumnCount = 0;
    var rowOpening;
    var columnOpening;

    for (var j=0; j<3; j++){ 
      //look at row & diagonals
      if (gameBoard[i][j]==='O'){ 
        oRowCount++;
      } else if (!gameBoard[i][j]){ 
        rowOpening = {xCoord:i, yCoord:j};
      }
      //look at column
      if (gameBoard[j][i]==='O'){ 
        oColumnCount++;
      } else if (!gameBoard[j][i]){ 
        columnOpening = {xCoord:j, yCoord:i};
      }
    }


    if (oRowCount == 2){ 
      return rowOpening;
    } 
    if (oColumnCount == 2){ 
      return columnOpening;
    } 
  }
}

//started with this logic in with other checks, but it was too messy
function findDefensivePlayInDiagonals(gameBoard){ 
  var oDiagOneCount = 0;
  var oDiagTwoCount = 0;
  var diagOneOpening;
  var diagTwoOpening;

  for (var i=0; i<3; i++){ 
      if (gameBoard[i][i]==='O'){ 
        oDiagOneCount++;
      } else if (!gameBoard[i][i]){ 
        diagOneOpening = {xCoord:i, yCoord:i};
      }
      if (gameBoard[i][2-i]==='O'){ 
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
  var possibleMoves = [[1,1],[0,1],[2,1],[1,0]];
  for (var i=0; i<possibleMoves.length; i++){ 
    if (!gameBoard[possibleMoves[i][0]][possibleMoves[i][1]]){ 
      gameBoard[possibleMoves[i][0]][possibleMoves[i][1]] = 'X';
      break;
    }  
  }
  return gameBoard;
}

exports.newGameBoard = newGameBoard;
exports.playOnCurrentGame = playOnCurrentGame;
