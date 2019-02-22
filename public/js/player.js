'use strict';

var solution = "";
var count = 0;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	initializePage();
	
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	setTimeout(function() {
		$('#exit').css('visibility','visible');
	},60000)
	$(".choice").click(checkAnswer);
	//Get the first question
	$.get('/json/puzzles',loadQuestion);
}

//Sets off an alarm when 
function checkAnswer(e) {
	e.preventDefault();
	//Extracts the given answer
	var answer = jQuery(this).attr('id');
	 
	//Formulate the response
	if (solution == answer) {
		//Increment the count and check if we can exit
		if (++count >= 3) {
			window.location.href =  '/index';
		}

		//change the colors
		var i;
		for (i = 1; i <= count; i++) {
			$('#count'+i).css('background-color','green');
		}
		$('#ans_output').text("CORRECT");
		$("#countTotal").text(count);
		
		//Load a new question
		$.get('/json/puzzles',loadQuestion);
	} else {
		$('#ans_output').text("WRONG");
	}
}

//Used to fill space
function loadQuestion(result) {
	var htmlData = result['question'] + 
	'<span id="solution" style="visibility:hidden">' + result['solution'] +
	'</span>';

	solution = result['solution'];

	$('#question').html(htmlData);
	$('#a p').text(result.choice.a);
	$('#b p').text(result.choice.b);
	$('#c p').text(result.choice.c);
	$('#d p').text(result.choice.d);
}

	
