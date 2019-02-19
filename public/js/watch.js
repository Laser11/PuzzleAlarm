'use strict';
var jsonPath = '../../clocks.json';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log(jsonPath);
	initializePage();
	
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	setInterval(checkClock,1000);
}

//Sets off an alarm when 
var checkClock = function checkClock() {
	//Extracts system clock

	var date = new Date();
	var timearr = date.toLocaleTimeString().split(' ');
	var timearr2 = timearr[0].split(':');
	var time = timearr2[0] + ':' + timearr2[1] + ' ' + timearr[1];
	console.log(time);	
	$(".timeText").each(function(index) {
		console.log($(this).html());
		if (jQuery(this).find(".timeSpan").html() == time &&
		 jQuery(this).find(".enableText").html() == "ON")
		{
			window.location.href = "/puzzle";
			startingAlarm = true;
		}	
	});

	
}