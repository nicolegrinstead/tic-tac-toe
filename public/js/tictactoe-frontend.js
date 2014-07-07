var playPending = false;

$(document).ready(function() {
  startNewGame();

  $("#unbeatable").click(function() {
    $.post( "change-difficulty", {difficulty:"unbeatable"});
  });
  $( "#easy").click(function() {
    $.post( "change-difficulty", {difficulty:"easy"});
  });

  $(document).on('click', '#game-square', function(e) {
      if (!playPending){
        playPending = true;
        makePlay($(this));
      }
  });
});

function startNewGame(){
  $.get("new-game-board", function(data) {
    for (var i=0; i<3; i++){
      $("#game-container").append("<div class='board-row' id='row-"+i+"'></div>");

      for (var j=0; j<3; j++){
        var gameSquareDiv = "<div id='game-square' data-x='"+i+"' data-y='"+j+"' ></div>";
        $("#game-container #row-"+i).append(gameSquareDiv);
      }
    }
  });
}

function makePlay(clickedSquare){
  clickedSquare.append("<span class='glyphicon glyphicon-unchecked' id='game-piece'></span>");

  $.post( "make-play", { xCoord: clickedSquare.data("x"), yCoord: clickedSquare.data("y") }).done(function( data ) {
    drawBoard(data.gameBoard);
    if (!data.playsLeft){
      //canPlay = false;
      var finalMessgeText;
      if (data.winner === 'X'){
        finalMessgeText = "Sorry X won this time.";
      } else if (data.winner === 'O'){
        finalMessgeText = "Congratulations O Wins!";
      } else {
        finalMessgeText = "Tie game!"
      }
      $('#final-message').append(finalMessgeText);
      $('#game-over-modal').modal('show');
    } else {
      playPending = false;
    }
  });
}

function drawBoard(gameBoard){
  for (var i=0; i<3; i++){
    for (var j=0; j<3; j++){
      //find matching div
      var currentSpace = $("#game-square[data-x='"+i+"'][data-y='"+j+"']");

      if (gameBoard[i][j] === 'O'){
        currentSpace.html("<span class='glyphicon glyphicon-unchecked' id='game-piece'></span>");
      }
      if (gameBoard[i][j] === 'X'){
        currentSpace.html("<span class='glyphicon glyphicon-remove' id='game-piece'></span>");
      }
    }
  }
}