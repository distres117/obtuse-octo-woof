
$(document).ready(function() {
	$('div#heading').slideDown("fast", function(){
		$('div#dialog').slideDown("fast");
		});
});

var answer = 1;
var wrongs = 0;

function checkAnswer(ans){
	if (ans >= 0 && ans <= 100){
		if (ans != answer){
			wrongs++;
			var mark = $('<span class="glyphicon glyphicon-remove" aria-hidden="true" id="marks"/>');
			gaugeAnswer(ans);
			mark.css({'display': 'inline-block'});			
			mark.fadeIn("slow", function(){
				if (wrongs===5)
					alert("you lose");
			});
			$('#tries').append(mark);
		}
		else{
			alert("You win");
		}
	}
}
	
function gaugeAnswer(number){
	var mWidth = $('#meter').width();
	var increment = mWidth / 100; 
	var pos= answer > number ? mWidth - ((answer - number) * increment) : mWidth - ((number-answer)  * increment);
	var style = { 
		'margin-left': pos.toString() + 'px', 
		'margin-top': '20px', 
		'position': 'absolute'
		};
	var user_answer = $("<p>" + number + "</p>");
	user_answer.css(style);
	$('#fill').animate( {width: pos + "px"}, 500, function() {
		user_answer.fadeIn("slow");
		$(this).append(user_answer);
	});
}
