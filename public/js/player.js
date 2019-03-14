'use strict';

var solution = "";
var count = 0;
var puzzlesUsed = [-1];
var resultCache;
var orderChoices = [
['a','b','c','d'],
['a','b','d','c'],
['a','c','b','d'],
['a','c','d','b'],
['a','d','c','b'],
['a','d','b','c'],

['b','a','c','d'],
['b','a','d','c'],
['b','c','a','d'],
['b','c','d','a'],
['b','d','c','a'],
['b','d','a','c'],

['c','b','a','d'],
['c','b','d','a'],
['c','a','b','d'],
['c','a','d','b'],
['c','d','a','b'],
['c','d','b','a'],

['d','a','c','b'],
['d','a','b','c'],
['d','c','a','b'],
['d','c','b','a'],
['d','b','c','a'],
['d','b','a','c']
];


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

	audio.play().catch(function() {
		
	});



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
		//Reshuffle answers on wrong choice
		shuffleChoices();
		$('#ans_output').text("WRONG");
	}
}

//Used to fill space
function loadQuestion(result) {
	//Cache the result for when reshuffling the answers
	resultCache = result;
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

	//Get question
	var htmlData = result['question'];
	//Get solution
	solution = result['solution'];

	//Assign questions and answers
	$('#question').html(htmlData);
	shuffleChoices();
}

	
function shuffleChoices() {
	var choiceID = Math.floor(Math.random() * orderChoices.length);
	var orderChoice = orderChoices[choiceID];

	//Clar and eassign id
	$('.a').attr('id','');
	$('.b').attr('id','');
	$('.c').attr('id','');
	$('.d').attr('id','');

	$('.a').attr('id',orderChoice[0]);
	$('.b').attr('id',orderChoice[1]);
	$('.c').attr('id',orderChoice[2]);
	$('.d').attr('id',orderChoice[3]);

	//Reassign answers
	$('#a p').text(resultCache.choice.a);
	$('#b p').text(resultCache.choice.b);
	$('#c p').text(resultCache.choice.c);
	$('#d p').text(resultCache.choice.d);
}