
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', {
  	'alarms' : [
  	{
  		"id": "clock1",
  		"time": "4:30 PM"
  	},
  	{
  		"id": "clock2",
  		"time": "3:30 PM"
  	}
  	]
  });
};