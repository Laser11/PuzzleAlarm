'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	initializePage();
	
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	isReady();
	$('.reqBox').click(isReady);
	$('.reqBox1').click(isReady);
	$('#clkname').on('input',isReady)
	$('#clktime').on('input',isReady)
}

//Check if requirements are met 
function isReady() {
	var stayDisabled = true;
	var stayDisabled1 = true;
	//Extracts and examines required checkboxes
	$(".reqBox").each(function(index) {
		if (jQuery(this).is(':checked')) {
			stayDisabled = false;
		}
	});
	$(".reqBox1").each(function(index) {
		if (jQuery(this).is(':checked')) {
			stayDisabled1 = false;
		}
	});
	
	if(!stayDisabled && !stayDisabled1 && $('#clkname').val() != null && $('#clkname').val().trim() != ''
		&& $('#clktime').val() != null && $('#clktime').val().trim() != '' ) {
		$('#submit').css('background-color','rgb(80,80,80)')
	}
	else {
		$('#submit').css('background-color','rgb(150,150,150)')
		stayDisabled = true;
	}
	$('#submit').attr('disabled',stayDisabled)
}