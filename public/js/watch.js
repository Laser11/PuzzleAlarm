'use strict';
var jsonPath = '../../clocks.json';
var clocks = require(jsonPath);

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	
	initializePage();
	
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	setInterval(checkClock(),1000);
}

//Sets off an alarm when 
function checkClock() {
	//Extracts system clock
	var date = new Date();
	var time = date.toLocaleTimeString();
	time = time.substring(0,5);
	console.log(time);
	//Compare time to json clocks
	for (clock in clocks.alarm) {
		//Goes to alarm when found
		if (clock.rawTime == time) {
			window.location.href = "/puzzle";
		}
	}
	
}