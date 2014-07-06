var TicTacToeGame = require('../tictactoe.js');
var assert = require("assert");

var xWins = 0;
var oWins = 0;
var ties = 0;

function playOutAllGames (game){
	var empties = game.findEmptySpaces();
	if (game.playsLeft){
		for (var i=0; i<empties.length; i++){
      var clonedGame = new TicTacToeGame();
      clonedGame.fromJson(game.toJson());
      clonedGame.playOnCurrentGame({xCoord:empties[i][0], yCoord:empties[i][1]});
      playOutAllGames(clonedGame);
		}
	} else {
		if (game.winner == 'X') xWins ++;
    else if (game.winner == 'O') oWins ++;
    else ties ++;
	}
}

describe('tic tac toe', function(){
  it('x will never lose', function(){
    playOutAllGames(new TicTacToeGame());
    console.log("O wins " + oWins);
    console.log("X wins " + xWins);
    console.log("ties " + ties);
    assert.equal(0, oWins);
  })

})