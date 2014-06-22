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
  var move = {xCoord: req.xCoord, yCoord: req.yCoord};

  if (!sess.gameBoard){ 
    console.log("nothing in session");
    sess.gameBoard = tictactoe.newGameBoard();
  } else {
    console.log("something in session and move was "); 
    sess.gameBoard = tictactoe.playOnCurrentGame(sess.gameBoard, move);
  }
  console.log(sess.gameBoard);
  res.send({gameBoard:sess.gameBoard});
};