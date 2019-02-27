var jsonPath = '../clocks.json';
var clocks = require(jsonPath);

//Adds week string to json object
function translateWeek(request) {
	var weekString = "";

	//Parse through each day choice. Append to weekstring
	if (request.query.monChoice == "checked") weekString += "M ";
	if (request.query.tueChoice == "checked") weekString += "Tu ";
	if (request.query.wedChoice == "checked") weekString += "W ";
	if (request.query.thuChoice == "checked") weekString += "Th ";
	if (request.query.friChoice == "checked") weekString += "F ";
	if (request.query.satChoice == "checked") weekString += "Sa ";
	if (request.query.sunChoice == "checked") weekString += "Su ";

	return weekString;
}

function translateDifficulty(request) {
	var diffJSON = {
		choice : "",
		easyCheck : "",
		medCheck : "",
		hardCheck: ""
	};
	diffJSON.choice = request.query.diff;
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
		name : request.query.clkname,
		rawTime : request.query.clktime,
		time: to12(request.query.clktime),
		date : request.query.date,
		song : request.query.musChoice,
		online : true,


		singleUse: request.query.ongoing,
		
		week : {
            monCheck 	: request.query.monChoice,
            tuesCheck 	: request.query.tueChoice,
            wedCheck 	: request.query.wedChoice,
            thursCheck 	: request.query.thuChoice,
            friCheck 	: request.query.friChoice,
            satCheck 	: request.query.satChoice,
            sunCheck 	: request.query.sunChoice,
            text : translateWeek(request)
        },

        puzzles : {
            triviaCheck : request.query.trivChoice,
            mathCheck 	: request.query.mathChoice,
            memoryCheck : request.query.memChoice
        },

        difficulty : translateDifficulty(request)
	}
	
	name = newdata.name;
	//console.log(newdata);
	//Overwrites a clock with the same name
	for (var i=0; i<clocks.alarms.length; i++) {
	  	//Renders the clock fields
	  	if (clocks.alarms[i].name == name) {
	  		newdata.online = clocks.alarms[i].online;
	  		clocks.alarms[i] = newdata;
	  		console.log(newdata.online)
	  		response.render('index', clocks);
	  		return;
	  	}
	    
  	}
	//Push the newjson object to file
	clocks.alarms.push(newdata);
	response.render('index',clocks);
 }