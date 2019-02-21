'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	initializePage();
	
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	setInterval(checkClock,1000);
}

//Sets off an alarm when 
function checkClock() {
	//Extracts system clock

	var date = new Date();
	var timearr = date.toLocaleTimeString().split(' ');
	var timearr2 = timearr[0].split(':');
	var time = timearr2[0] + ':' + timearr2[1] + ' ' + timearr[1];
	
	//Extracts and examines stored alarm
	$(".timeText").each(function(index) {
		if (jQuery(this).find(".timeSpan").html() == time &&
		 jQuery(this).find(".enableText").html() == "ON")
		{

			var id = jQuery(this).find(".songText").html()
			window.location.href = "/puzzle?songID=" + id;
			
		}	
	});

	
}