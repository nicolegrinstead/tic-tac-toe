var TicTacToeGame = require('../tictactoe.js');
var assert = require("assert");

describe('Index', function(){
  it('can create an empty game board', function(){
    var game = new TicTacToeGame();

    assert.deepEqual([[],[],[]], game.board);
  })

  it('can make first move and ai will start in center', function(){
    var game = new TicTacToeGame();

    game.playOnCurrentGame({xCoord:0, yCoord:0});

    assert.equal(game.board[0][0], 'O');
    assert.equal(game.board[1][1], 'X');
  })

  it('cannot play in an invalid place', function(){
    var game = new TicTacToeGame();

    game.playOnCurrentGame({xCoord:3, yCoord:3});

    assert.deepEqual([[],[],[]], game.board);
  })

  it('will not place a move somewhere that is occupied', function(){
    var game = new TicTacToeGame();

    game.playOnCurrentGame({xCoord:0, yCoord:0});
    game.playOnCurrentGame({xCoord:0, yCoord:0});

    assert.deepEqual([["O"],[,"X"],[]], game.board);
  })

  it('will make a blocking move on a row', function(){
    var game = new TicTacToeGame();
                                                                            //
    game.playOnCurrentGame({xCoord:0, yCoord:0});                           //   O | O | X
    game.playOnCurrentGame({xCoord:0, yCoord:1});                           //  ___________
                                                                            //     | X |   
    assert.deepEqual([ [ 'O', 'O', 'X' ], [ , 'X' ], [] ], game.board);     //  ___________ 
                                                                            //     |   |
  })  

  it('will make a blocking move on a column', function(){
    var game = new TicTacToeGame();
                                                                            //
    game.playOnCurrentGame({xCoord:0, yCoord:0});                           //   O |   | 
    game.playOnCurrentGame({xCoord:1, yCoord:0});                           //  ___________
                                                                            //   O | X |   
    assert.deepEqual([ [ 'O'], [ 'O', 'X' ], ['X'] ], game.board);          //  ___________ 
                                                                            //   X |   |

  })  

  it('will make a blocking move on one diagonal', function(){
    var game = new TicTacToeGame();
                                                                            //
    game.playOnCurrentGame({xCoord:1, yCoord:1});                           //   O | X | 
    game.playOnCurrentGame({xCoord:0, yCoord:0});                           //  ___________
                                                                            //     | O |   
                                                                            //  ___________ 
                                                                            //     |   | X

    assert.deepEqual([["O","X"],[,"O"],[,,"X"]], game.board);
  })  

  it('will make a blocking move the other diagonal', function(){
    var game = new TicTacToeGame();
                                                                            //
    game.playOnCurrentGame({xCoord:1, yCoord:1});                           //     | X | O
    game.playOnCurrentGame({xCoord:0, yCoord:2});                           //  ___________
                                                                            //     | O |   
                                                                            //  ___________ 
                                                                            //   X |   | 

    assert.deepEqual([[,"X","O"],[,"O"],["X"]], game.board);
  }) 

  it('can make several moves', function(){
    var game = new TicTacToeGame();
                                                                            //
    game.playOnCurrentGame({xCoord:1, yCoord:1});                           //     | X | O
    game.playOnCurrentGame({xCoord:0, yCoord:2});                           //  ___________
    game.playOnCurrentGame({xCoord:2, yCoord:2});                           //     | O | X  
                                                                            //  ___________ 
                                                                            //   X |   | O

    assert.deepEqual([[,"X","O"],[,"O","X"],["X",,"O"]], game.board);
  }) 

  it('can make moves when all the defensive plays are gone', function(){
    var game = new TicTacToeGame();
                                                                            //
    game.playOnCurrentGame({xCoord:1, yCoord:1});                           //   X | X | O
    game.playOnCurrentGame({xCoord:0, yCoord:2});                           //  ___________
    game.playOnCurrentGame({xCoord:2, yCoord:2});                           //     | O | X  
    game.playOnCurrentGame({xCoord:2, yCoord:1});                           //  ___________ 
                                                                            //   X | O | O

    assert.deepEqual([[,"X","O"],["X","O","X"],["X","O","O"]], game.board);
  }) 

  it('will make the winning move if available', function(){
    var game = new TicTacToeGame();
                                                                            //
    game.playOnCurrentGame({xCoord:0, yCoord:0});                           //   O | O  | X
    game.playOnCurrentGame({xCoord:0, yCoord:1});                           //  ___________
    game.playOnCurrentGame({xCoord:2, yCoord:2});                           //      | X |   
                                                                            //  ___________ 
                                                                            //   X |    | O
    assert.deepEqual([["O","O","X"],[,"X"],["X",,"O"]], game.board);
  }) 
})
