var clocks = require("../clocks.json")
/*
 * GET clock creation page.
 */

exports.view = function(req, res){
  //Extract which alarm we're using
  var name = req.query.name;

  //Searches the json for the group with the name
  for (var i=0; i<clocks.alarms.length; i++) {
  	console.log(clocks.alarms[i].name);
  	//Renders the clock fields
  	if (clocks.alarms[i].name == name) {
  		res.render('create', clocks.alarms[i]);
  		return;
  	}
    
  }
  res.render('create');
  
};