var jsonPath = '../clocks.json';
var clocks = require(jsonPath);

//Adds week string to json object
function translateWeek(request) {
	var weekString = "";

	//Parse through each day choice. Append to weekstring
	if (request.body.monChoice == "checked") weekString += "M ";
	if (request.body.tueChoice == "checked") weekString += "Tu ";
	if (request.body.wedChoice == "checked") weekString += "W ";
	if (request.body.thuChoice == "checked") weekString += "Th ";
	if (request.body.friChoice == "checked") weekString += "F ";
	if (request.body.satChoice == "checked") weekString += "Sa ";
	if (request.body.sunChoice == "checked") weekString += "Su ";

	return weekString;
}

function translateDifficulty(request) {
	var diffJSON = {
		choice : "",
		easyCheck : "",
		medCheck : "",
		hardCheck: ""
	};
	diffJSON.choice = request.body.diff;
	switch(diffJSON.choice) {
		case "med":
			diffJSON.medCheck = "checked";
			break;
		case "hard":
			diffJSON.hardCheck = "checked";
			break;
		default:
			diffJSON.easyCheck = "checked";
	}
	return diffJSON;
}

//Converts 24 hour clock to 12 hour clock
function to12(time24) {

	var timearr = time24.split(":",2);
	var hr = parseInt(timearr[0]);
	var min = timearr[1];
	var suffix = (hr >= 12) ? " PM":" AM";
	hr = (hr > 12) ? hr - 12: hr;
	hr = (hr == 0) ? 12: hr;

	return hr + ":" + min + suffix;
}

exports.addClock = function(request, response) {    
	//Map query onto the json object
	var newdata = {
		name : request.body.clkname,
		rawTime : request.body.clktime,
		time: to12(request.body.clktime),
		date : request.body.date,
		song : request.body.musChoice,
		online : true,


		singleUse: request.body.ongoing,
		
		week : {
            monCheck 	: request.body.monChoice,
            tuesCheck 	: request.body.tueChoice,
            wedCheck 	: request.body.wedChoice,
            thursCheck 	: request.body.thuChoice,
            friCheck 	: request.body.friChoice,
            satCheck 	: request.body.satChoice,
            sunCheck 	: request.body.sunChoice,
            text : translateWeek(request)
        },

        puzzles : {
            triviaCheck : request.body.trivChoice,
            mathCheck 	: request.body.mathChoice,
            memoryCheck : request.body.memChoice
        },

        difficulty : translateDifficulty(request)
	}

	console.log(newdata);
	
	name = newdata.name;
	//console.log(newdata);
	//Overwrites a clock with the same name
	for (var i=0; i<clocks.alarms.length; i++) {
	  	//Renders the clock fields
	  	if (clocks.alarms[i].name == name) {
	  		newdata.online = clocks.alarms[i].online;
	  		clocks.alarms[i] = newdata;
	  		response.render('index', clocks);
	  		return;
	  	}
	    
  	}
	//Push the newjson object to file
	clocks.alarms.push(newdata);
	response.render('index',clocks);
 }