var clocks = require("../clocks.json");
/*
 * GET home page.
 */

exports.view = function(req, res){
  //Render the home page
  res.render('index', clocks);
  //Add an event listener
  
};