
/*
 * GET clock creation page.
 */

exports.view = function(req, res){
  res.render('create', {
  	"oldName" : "Wilson",
  	"oldTime" : "10:20 AM",
  	"oldDate" : "2012-09-01",
  	"triviaCheck" : "checked",
  	"mathCheck" : "checked",
  	"singleUse" : "checked",
  });
};