var TicTacToeGame = require('../tictactoe.js');

exports.index = function(req, res){
  var sess = req.session;
  if (typeof sess.unbeatable === "undefined"){
    sess.unbeatable = true;
  }

  res.render('index', {title:"tic-tac-toe", unbeatable:sess.unbeatable});
};

exports.newGameBoard = function(req, res){
  var sess = req.session;
  var newGame = new TicTacToeGame();

  if (typeof sess.unbeatable != "undefined") {
    newGame.unbeatable = sess.unbeatable;
  }

  sess.game = newGame.toJson();

  res.send({gameBoard:sess.game.board, playsLeft:sess.game.playsLeft});
};

exports.makePlay = function(req, res){
  var sess = req.session;

  var game = new TicTacToeGame();
  if (sess.game){
    game.fromJson(sess.game);
  }

  if (game.playsLeft){
    game.playOnCurrentGame({xCoord: req.body.xCoord, yCoord: req.body.yCoord});
  }
  sess.game = game.toJson();

  res.send({gameBoard:game.board, playsLeft:game.playsLeft, winner:game.winner});
};

exports.changeDifficulty = function(req, res){
  var difficulty = req.body.difficulty;
  var sess = req.session;

  if (difficulty === 'easy') {
    sess.unbeatable = false;
  } else {
    sess.unbeatable = true;
  }
  res.send();
};
