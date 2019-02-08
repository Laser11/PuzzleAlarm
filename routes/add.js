var clocks = require("../clocks.json");

exports.addClock = function(request, response) {    
	var newdata = {name : request.query.clkname,
		time: request.query.clktime,
		//singleuse : request.query.ongoing == "true" ? "":"checked",
		date : request.query.date,
		//triviaCheck : request.query.puzzleChoice == "trivia" ? "checked":"",
		//mathCheck : request.query.puzzleChoice == "math" ? "checked":""
		online : "ON"
	}
	
	
	clocks.alarms.push(newdata);

	response.render('index',clocks);
 }