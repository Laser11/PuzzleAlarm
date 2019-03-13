'use strict';

var solution = "";
var count = 0;
var puzzlesUsed = [-1];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	initializePage();
	
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	//Set listeners
	setTimeout(function() {
		$('#exit').css('visibility','visible');
	},60000);
	$(".choice").click(checkAnswer);
	$("#snooze").click(snoozeSong);
	//Get the first question
	$.get('/json/puzzles/' + $('#clockName').text(),loadQuestion);

	//Set audio
	var audio = $("#musicPlayer").get(0);
	audio.src = "";
	audio.src = "/music/" + $("#musicPlayer").html();

	audio.load();

	document.getElementById("musicButton").click()

//	audio.play().catch(function() {
		
//	});



}

//Mutes the music for 10 seconds
function snoozeSong(e) {
	$("#musicPlayer").prop("muted",true);
	//ga("send", "event", "snooze", "click");
	setTimeout(function() {
		$("#musicPlayer").prop("muted",false);
	},10000);
}

//Sets off an alarm when 
function checkAnswer(e) {
	e.preventDefault();
	//ga("send", "event", "answer", "click");
	//Extracts the given answer
	var answer = jQuery(this).attr('id');
	 
	//Formulate the response
	if (solution == answer) {
		//Increment the count and check if we can exit
		if (++count >= 3) {
			window.location.href =  '/index';
		}

		//Set the volume of the music
		$('#musicPlayer').prop('volume',1/(Math.pow(10,count)));

		console.log("Volume:" + $('#musicPlayer').prop('volume'));

		//change the colors
		var i;
		for (i = 1; i <= count; i++) {
			$('#count'+i).css('background-color','green');
		}
		$('#ans_output').text("CORRECT");
		$("#countTotal").text(count);
		
		//Load a new question
		$.get('/json/puzzles/' + $('#clockName').text(),loadQuestion);
	} else {
		$('#ans_output').text("WRONG");
	}
}

//Used to fill space
function loadQuestion(result) {
	var puzzleId = result['id'];
	//Stops if the question was already used
	if (puzzlesUsed.includes(puzzleId)) {
		//Load a new question
		$.get('/json/puzzles/' + $('#clockName').text(),loadQuestion);
		return;
	}
	else{
		puzzlesUsed.push(puzzleId);
	}


	var htmlData = result['question'];

	solution = result['solution'];

	$('#question').html(htmlData);
	$('#a p').text(result.choice.a);
	$('#b p').text(result.choice.b);
	$('#c p').text(result.choice.c);
	$('#d p').text(result.choice.d);
}

	
