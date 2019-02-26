'use strict';

var weekday = new Array(7);
weekday[0] =  "Su";
weekday[1] = "M";
weekday[2] = "Tu";
weekday[3] = "W";
weekday[4] = "Th";
weekday[5] = "F";
weekday[6] = "Sa";

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
	var today = date.getDay();
	var timearr2 = timearr[0].split(':');
	var time = timearr2[0] + ":" + timearr2[1] + " " + timearr[1];
	time = time.replace(/[^ -~]/g,'');

	//Extracts and examines stored alarm
	$(".alarm").each(function(index) {
		var clockName = jQuery(this).find(".nameText .theName").text();
		var clockTime = jQuery(this).find(".timeText .timeSpan").text();
		var isEnabled = jQuery(this).find(".timeText .enableText").text();
		var clockDays = jQuery(this).find(".daysText").text().split(' ');
		

		var isDay = clockDays.some(function(elem) {
			return elem == weekday[today];
		});

		if (clockTime == time &&
			isDay &&
			isEnabled == "true")
		{

			var id = jQuery(this).find(".songText").html()
			window.location.href = "/puzzle/" + id + "?name=" + clockName;
			
		}	
	});

	
}