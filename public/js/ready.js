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
	$('.reqBox1').click(isReady);
	$('#clkname').on('input',isReady);
	$('#clktime').on('input',isReady);
	$('#clkdate').on('input',isReady);
	
}

//Check if requirements are met 
function isReady() {
	var stayDisabled = true;
	//Extracts and examines required checkboxes
	$(".reqBox1").each(function(index) {
		if (jQuery(this).is(':checked')) {
			stayDisabled = false;
		}
	});
	
	if(!stayDisabled 
		&& $('#clkname').val() != null && $('#clkname').val().trim() != ''
		&& $('#clktime').val() != null && $('#clktime').val().trim() != ''
		&& $('#clkdate').val() != null && $('#clkdate').val().trim() != '' ) {
		$('#submitSave').css('background-color','rgb(50,50,50)')
	}
	else {
		$('#submitSave').css('background-color','rgb(150,150,150)')
		stayDisabled = true;
	}
	$('#submitSave').attr('disabled',stayDisabled)
}