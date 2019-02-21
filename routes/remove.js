var jsonPath = '../clocks.json';
var clocks = require(jsonPath);

exports.removeClock = function(request, response) {    
	
	var name = request.query.name;
	//console.log(newdata);
	//Looks for a clock with the same name
	for (var i=0; i<clocks.alarms.length; i++) {
	  	//Removes the clock and render the change
	  	if (clocks.alarms[i].name == name) {
	  		clocks.alarms.splice(i,1);
	  		response.render('index', clocks);
	  		return;
	  	}
	    
  	}
	//Renders the clocks without change if nothing is found
	response.render('index',clocks);
 }