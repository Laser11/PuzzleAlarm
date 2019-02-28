var data = require('../clocks.json');

exports.clockInfoAll = function(req,res) {
	res.json(data);
}

exports.clockInfo = function(req, res) { 

	//Extract which alarm we're using
	var name = req.params.clockname;

	res.json(getClock(name));
}

//Switches the online status of the clock
exports.switchClock = function(req, res) { 

	//Extract which alarm we're using
	var name = req.params.clockname;

	var clock = getClock(name);
	clock['online'] = (req.params.isOn == 'true')
	return;
}

function getClock(name) {
	//Searches the json for the group with the name
	for (var i=0; i< data.alarms.length; i++) {
	  	//Renders the clock fields
	  	if (data.alarms[i].name == name) {
			return data.alarms[i];
		}
	}
    //Return if no match is found
  	return;
}