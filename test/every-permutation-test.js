var TicTacToeGame = require('../tictactoe.js');
var assert = require("assert");

function findVictory(game) {
var runs =
[
// diagonals
[{x:0,y:0},{x:1,y:1},{x:2,y:2}],
[{x:2,y:0},{x:1,y:1},{x:0,y:2}],

// horizontals
[{x:0,y:0},{x:1,y:0},{x:2,y:0}],
[{x:0,y:1},{x:1,y:1},{x:2,y:1}],
[{x:0,y:2},{x:1,y:2},{x:2,y:2}],

// verticals
[{x:0,y:0},{x:0,y:1},{x:0,y:2}],
[{x:1,y:0},{x:1,y:1},{x:1,y:2}],
[{x:2,y:0},{x:2,y:1},{x:2,y:2}],
];

for (var i = 0; i < runs.length; i++) {
	var run = runs[i];
	var numX = 0;
	var numO = 0;
	run.forEach(function(location) {
	if (game.board[location.x][location.y] == 'X') {
		numX++;
	}
	if (game.board[location.x][location.y] == 'O') {
	 numO++;
	}
});

	if (numX == 3) {return 'X';}
	if (numO == 3) {return 'O';}
	}
}



it('will win every possible game', function() {
var victories = [];
var n = 0;
function playallavailable(game, previousMoves) {
n++;
previousMoves = previousMoves || [];
var vic = findVictory(game);
if (vic) {
victories.push({winner:vic,board:game.board,moves:previousMoves});
return;
}

for (var x = 0; x < 3; x++) {
for (var y = 0; y < 3; y++) {
if (!game.board[x][y]) {
var newGame = new TicTacToeGame();
newGame.fromJson(game.toJson());
// console.log(previousMoves, x, y);
newGame.playOnCurrentGame({xCoord: x, yCoord: y });
var newPreviousMoves = previousMoves.slice();
newPreviousMoves.push({xCoord: x, yCoord: y })
playallavailable(newGame, newPreviousMoves);
}
}
}
}
playallavailable(new TicTacToeGame());
console.log("Number of runs: ", n);
console.log("Number of X Victories: ", victories.filter(function(v) {return v.winner === "X"; }).length);
console.log("Number of O Victories: ", victories.filter(function(v) {return v.winner === "O"; }).length);

var oWins = victories.filter(function(v) {return v.winner === "O"; });
oWins.forEach(function(v) {
console.log("Error: O won -> ", v.board, "\n", v.moves);
});

assert.equal(oWins.length, 0, "O never wins");
});