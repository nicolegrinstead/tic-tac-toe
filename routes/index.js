var tictactoe = require('../tictactoe.js');

exports.index = function(req, res){
  res.render('index', {title:"tic-tac-toe"});
};

exports.newGameBoard = function(req, res){
  var sess = req.session;
  sess.gameBoard = tictactoe.newGameBoard();

  res.send({gameBoard:sess.gameBoard});
};

exports.makePlay = function(req, res){
  var sess = req.session;

  if (!sess.playPending){
    sess.playPending = true;

    var move = {xCoord: req.body.xCoord, yCoord: req.body.yCoord};

    if (!sess.gameBoard){ 
      sess.gameBoard = tictactoe.newGameBoard();
    } else {
      sess.gameBoard = tictactoe.playOnCurrentGame(sess.gameBoard, move);
    }
  }
  sess.playPending = false;

  res.send({gameBoard:sess.gameBoard});
};