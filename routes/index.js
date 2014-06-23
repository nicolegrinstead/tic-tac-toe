var TicTacToeGame = require('../tictactoe.js');

exports.index = function(req, res){
  res.render('index', {title:"tic-tac-toe"});
};

exports.newGameBoard = function(req, res){
  var sess = req.session;
  sess.game = new TicTacToeGame().toJson();
  //sess.game.playOnCurrentGame({xCoord:0, yCoord:0});
//console.log("game is in new board" + sess.game);


  res.send({gameBoard:sess.game.board});
};

exports.makePlay = function(req, res){
  var sess = req.session;
  var game = new TicTacToeGame();
  if (sess.game){ 
    game.fromJson(sess.game);
  }

  if (!sess.playPending){
    sess.playPending = true;
    game.playOnCurrentGame({xCoord: req.body.xCoord, yCoord: req.body.yCoord});
  }
  sess.playPending = false;
  sess.game = game.toJson();

  res.send({gameBoard:game.board});
};