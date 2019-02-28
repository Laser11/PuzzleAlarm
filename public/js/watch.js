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
	//Alarm editing
	$('.alarm').click(function(e) {
		e.preventDefault();
		var name = $(this).find('.nameText').text().trim();
		var online = !(jQuery(this).find(".switch input").prop('checked'))
		window.location.replace("/create?name=" + name);
		
	});
	//On/off slide
	$('.switch').each(updateColors);
	$('.switch').click(updateColors1);
	setInterval(checkClock,1000);

}

//Updates the color upon page initiation
function updateColors() {
		//Turn on
		if(!$(this).find('input').prop('checked')) {
			color = 'rgb(100,100,100)';	
		} 
		//Turn off
		else {
			var color = 'rgb(180,180,180)';
		}
		$(this).closest('.alarm').css('background-color',color);
		
}
//Updates the color upon flipping the switch
function updateColors1(e) {
		//Get name
		var name = $(this).closest('.nameText').text().trim();
		//Turn on
		if(!$(this).find('input').prop('checked')) {
			color = 'rgb(100,100,100)';	
			$.get('/json/clocks/'+name+'/true');
		} 
		//Turn off
		else {
			var color = 'rgb(180,180,180)';
			$.get('/json/clocks/'+name+'/false');
		}
		$(this).closest('.alarm').css('background-color',color);
		e.stopPropagation();
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
		var isEnabled = !(jQuery(this).find(".switch input").prop('checked'));
		var clockDays = jQuery(this).find(".daysText").text().split(' ');
		


		var isDay = clockDays.some(function(elem) {
			return elem == weekday[today];
		});

		if (clockTime == time &&
			isDay &&
			isEnabled)
		{

			var id = jQuery(this).find(".songText").html()
			window.location.href = "/puzzle/" + id + "?name=" + clockName;
			
		}	
	});

	
}