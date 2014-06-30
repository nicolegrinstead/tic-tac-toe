//alternate xs and os until you come to an end
//negamax algorithm
function moveOrderPermutations (xPlay, board, depth, bestPlay){ 

  var score = getScore(board, depth);
  if (score != 0){ //game over return heuristic value of node
    console.log("here returning " +score);
    return score; 
  }

  var score = 0;
  var moves = [];
  var max = 0;
  depth++;
  var possibleMoves = emptySpaces(board);
  for (var i=0; i<possibleMoves.length; i++){ 
    var cloned = deepCopy(board);
    cloned[possibleMoves[i][0]][possibleMoves[i][1]] = xPlay ? 'X' : 'O';
    moves.push([[possibleMoves[i][0]],[possibleMoves[i][1]]]);  

    //console.log("board is "+board);  
        console.log("board bef " + board);

    console.log("cloned is "+cloned);
    console.log("moves " + moves );

    //console.log("calling recursive with " + !xPlay + " " + cloned.printBoard() +  " " + depth);
    //var newMax = max > score ? max : score;
    score = moveOrderPermutations(!xPlay, cloned, depth, bestPlay);
    if (score > max){
      max = score; 
      console.log("setting best play " + moves[0] + " " +score);
      bestPlay = moves[0]; 
    }

  }
  console.log("about to return " + max);
  return bestPlay;
  
 }

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
  return emptySpaces;
}