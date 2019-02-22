'use strict';

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
}

//Sets off an alarm when 
function checkAnswer(e) {
	e.preventDefault();
	//Extracts the stored answer
	var solution = $('#solution').text();
	var answer = jQuery(this).attr('id');
	//Calculate the current count
	var count = parseInt($("#countTotal").text())
	//Formulate the response
	if (solution == answer) {
		if (++count >= 3) {
			window.location.href =  '/index';
		}
		//change the colors
		//Decide the color
		var i;
		for (i = 1; i <= count; i++) {
			$('#count'+i).css('background-color','green');
		}
		$('#ans_output').text("CORRECT");
		$("#countTotal").text(count);
		$.get('/json/puzzles',loadQuestion);
	} else {
		$('#ans_output').text("WRONG");
	}
	
//Used to fill space
function loadQuestion(result) {
	var htmlData = result['question'] + 
	'<span id="solution" style="visibility:hidden">' + result['solution'] +
	'</span>';
	$('#question').html(htmlData);
	$('#a p').text(result['choice.a']);
	$('#b p').text(result['choice.b']);
	$('#c p').text(result['choice.c']);
	$('#d p').text(result['choice.d']);
}

	
}