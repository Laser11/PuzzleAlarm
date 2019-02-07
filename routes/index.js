var clocks = require("../clocks.json");
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', clocks);
};