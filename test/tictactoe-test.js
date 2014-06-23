var game = require('../tictactoe.js');
var assert = require("assert");

describe('Index', function(){
  it('can create an empty game board', function(){
    var newBoard = game.newGameBoard();

    assert.deepEqual([[],[],[]], newBoard);
  })

  it('can make first move and ai will start in center', function(){
    var newBoard = game.newGameBoard();

    var board = game.playOnCurrentGame(newBoard, {xCoord:0, yCoord:0});

    assert.equal(board[0][0], 'O');
    assert.equal(board[1][1], 'X');
  })

  it('cannot play in an invalid place', function(){
    var newBoard = game.newGameBoard();

    var board = game.playOnCurrentGame(newBoard, {xCoord:3, yCoord:3});

    assert.deepEqual([[],[],[]], board);
  })

  it('will not place a move somewhere that is occupied', function(){
    var newBoard = game.newGameBoard();

    var board = game.playOnCurrentGame(newBoard, {xCoord:0, yCoord:0});
    board = game.playOnCurrentGame(board, {xCoord:0, yCoord:0});

    assert.deepEqual([["O"],[,"X"],[]], board);
  })

  it('will make a blocking move on a row', function(){
    var newBoard = game.newGameBoard();
                                                                            //
    var board = game.playOnCurrentGame(newBoard, {xCoord:0, yCoord:0});     //   O | O | X
    board = game.playOnCurrentGame(board, {xCoord:0, yCoord:1});            //  ___________
                                                                            //     | X |   
    assert.deepEqual([ [ 'O', 'O', 'X' ], [ , 'X' ], [] ], board);          //  ___________ 
                                                                            //     |   |
  })  

  it('will make a blocking move on a column', function(){
    var newBoard = game.newGameBoard();
                                                                            //
    var board = game.playOnCurrentGame(newBoard, {xCoord:0, yCoord:0});     //   O |   | 
    board = game.playOnCurrentGame(board, {xCoord:1, yCoord:0});            //  ___________
                                                                            //   O | X |   
    assert.deepEqual([ [ 'O'], [ 'O', 'X' ], ['X'] ], board);               //  ___________ 
                                                                            //   X |   |

  })  

  it('will make a blocking move on one diagonal', function(){
    var newBoard = game.newGameBoard();
                                                                            //
    var board = game.playOnCurrentGame(newBoard, {xCoord:1, yCoord:1});     //   O | X | 
    board = game.playOnCurrentGame(board, {xCoord:0, yCoord:0});            //  ___________
                                                                            //     | O |   
                                                                            //  ___________ 
                                                                            //     |   | X

    assert.deepEqual([["O","X"],[,"O"],[,,"X"]], board);
  })  

  it('will make a blocking move the other diagonal', function(){
    var newBoard = game.newGameBoard();
                                                                            //
    var board = game.playOnCurrentGame(newBoard, {xCoord:1, yCoord:1});     //     | X | O
    board = game.playOnCurrentGame(board, {xCoord:0, yCoord:2});            //  ___________
                                                                            //     | O |   
                                                                            //  ___________ 
                                                                            //   X |   | 

    assert.deepEqual([[,"X","O"],[,"O"],["X"]], board);
  }) 

  it('can make several moves', function(){
    var newBoard = game.newGameBoard();
                                                                            //
    var board = game.playOnCurrentGame(newBoard, {xCoord:1, yCoord:1});     //     | X | O
    board = game.playOnCurrentGame(board, {xCoord:0, yCoord:2});            //  ___________
    board = game.playOnCurrentGame(board, {xCoord:2, yCoord:2});            //     | O | X  
                                                                            //  ___________ 
                                                                            //   X |   | O

    assert.deepEqual([[,"X","O"],[,"O","X"],["X",,"O"]], board);
  }) 

  it('can make moves when all the defensive plays are gone', function(){
    var newBoard = game.newGameBoard();
                                                                            //
    var board = game.playOnCurrentGame(newBoard, {xCoord:1, yCoord:1});     //   X | X | O
    board = game.playOnCurrentGame(board, {xCoord:0, yCoord:2});            //  ___________
    board = game.playOnCurrentGame(board, {xCoord:2, yCoord:2});            //     | O | X  
    board = game.playOnCurrentGame(board, {xCoord:2, yCoord:1});            //  ___________ 
                                                                            //   X | O | O

    assert.deepEqual([[,"X","O"],["X","O","X"],["X","O","O"]], board);
  }) 

  it('will make the winning move if available', function(){
    var newBoard = game.newGameBoard();
                                                                            //
    var board = game.playOnCurrentGame(newBoard, {xCoord:0, yCoord:0});     //   O | O  | X
    board = game.playOnCurrentGame(board, {xCoord:0, yCoord:1});            //  ___________
    board = game.playOnCurrentGame(board, {xCoord:2, yCoord:2});            //      | X |   
                                                                            //  ___________ 
                                                                            //   X |    | O
    assert.deepEqual([["O","O","X"],[,"X"],["X",,"O"]], board);
  }) 
})
