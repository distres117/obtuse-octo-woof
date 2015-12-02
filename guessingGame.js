/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var game;
playAgain();
var _answer;


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	var answer = Math.round(Math.random() * 99) + 1;
  _answer = answer;
  var wrongs = 0;
  var past_answers = [];
  return function(guess){//main game function
    $('#guessInput').val("");
    if (past_answers.indexOf(guess)=== -1){
      var check = checkGuess(guess,answer);
      if (check===false){
        wrongs++;
        past_answers.push(guess);
        var mark = $('<span class="glyphicon glyphicon-remove"; aria-hidden="true" id="marks"/>');
  			mark.css({'display': 'inline-block'});
  			mark.fadeIn("slow", function(){
  				if (wrongs===5){
  					changeDOM($('#heading'), "You lose!");
            changeDOM($('#dialogTitle h2'), "Play again...if you dare");
            $('#submitBtn').html("Play again");
          }
          else {
            lowerOrHigher(guess,answer);
            changeDOM($('#dialogTitle h2'), getFeedback());
          }
  			});
  			$('#tries').append(mark);
      }
      else if (check===true){
        changeDOM($('#heading'), "You win!");
        $('#submitBtn').html("Play again");
      }
    }
      else
        changeDOM($('#dialogTitle h2'), "You already tried that number!");
  }
}


// Fetch the Players Guess

function playersGuessSubmission(){
	var guess = parseInt($('#guessInput').val());
  if (guess)
    game(guess);
  else changeDOM($('#dialogTitle h2'), "Didn't quite get that, try again.");
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(guess, answer){
  var mWidth = $('#meter').width();
  var increment = mWidth / 100;
  var pos= answer > guess ? mWidth - ((answer - guess) * increment) : mWidth - ((guess-answer)  * increment);
  var style = {
    'margin-left': pos.toString() + 'px',
    'margin-top': '20px', //Change this so answers don't colide
    'position': 'absolute'
    };
  var user_answer = $("<p>" + guess + "</p>");
  user_answer.css(style);
  checkExistingItems(pos, user_answer);
  $('#fill').animate( {width: pos + "px"}, 500, function() {
    user_answer.fadeIn("slow");
    $(this).append(user_answer);
  });
}
//Loop through current marks to prevent overlap (well, sort of)
function checkExistingItems(pos, elem){
  var distances =[]; //array to hold potential candidates
  var items = $('#fill').children();
  for (var i = 0; i < items.length;i++){
    var item = $(items[i]);
    var margin= parseInt(item.css("margin-left").replace("px",""));
    if (pos > margin && pos - margin <= 10 || margin > pos && margin - pos <= 20 ){
      distances.push({elem: item, distance: pos > margin ? pos - margin : margin - pos });
      //If the element is within a certain threshold, add it to the list
    }
  }
  distances.sort(a=>a.distance); //Get the closest item from the list
  var item = distances[0];
  if (item){
    var margin_top = item.elem.css("margin-top");
    elem.css({"margin-top" : margin_top === "40px" ? "0px" : "40px" });
  }
}

// Check if the Player's Guess is the winning number

function checkGuess(guess, answer){
  if (guess > 0 && guess <= 100){
		if (guess != answer){
      return false;
		}
		else{
			return true;
		}
	}
  else
    changeDOM($('#dialogTitle h2'), "Whoa, thats not even in the ballpark...");
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	game = generateWinningNumber();
}

//Changes DOM text to provide feedback
function changeDOM(elem, text){
  elem.fadeOut("fast", function(){
    $(this).text(text);
    $(this).fadeIn("fast");
  });
}

//Resets DOM and game elements
function resetGame(){
  $('#tries').empty();
  $('#fill').animate({width:0}, 500, function(){
    $(this).empty();
  });
  $('#submitBtn').html("Submit");
  changeDOM($('#dialogTitle h2'),"I'm thinking of a number between 1-100...");
  changeDOM($('#heading'), "Guess the number!");
  playAgain();

}

//Random message when the user guesses incorrectly
function getFeedback(){
  var feedbacks = [
    "Nope, not this time...",
    "Close, but no cigar!",
    "That's not the number I'm looking for",
    "You got it!  Just kidding.",
    "Mmmm...No, afraid thats not it"
  ];
  return feedbacks[Math.round(Math.random() * 4)];
}
/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	$('div#heading').slideDown("fast", function(){
		$('div#dialog').slideDown("fast");
		});
});

$('#submitBtn').on('click', function(){
  if ($(this).html()=== "Submit")
    playersGuessSubmission();
  else
    resetGame();
} );

$('#guessInput').on('keydown', function(e){
  if (e.keyCode === 13 && $('#submitBtn').html() === "Submit")
    playersGuessSubmission();
});
