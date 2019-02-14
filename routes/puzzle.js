var puzzleData = require('../puzzles.json');
/*
 * GET puzzle page and alarm
 */
exports.viewA = function(req, res){
  
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0);
};

// GET puzzle page after answering a question
exports.viewB = function(req, res) {
  var ansarr = req.query.answer.split(" ",2);
  var index;
  var counter = parseInt(req.query.count);

  

  //Determine solution
  if (ansarr[0] == [ansarr[1]]) {
  	counter++;
  	index = parseInt(req.query.id);
  } else {
  	index = Math.floor(Math.random() * puzzleData.puzzles.length);
  }
  renderPuzzle(req,res,index,counter);
}


// GET puzzle page without alarm
exports.view = function(req, res){
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0);
};

function renderPuzzle(req,res,ind,counter) {
	var chosen = puzzleData.puzzles[ind];
	chosen.id = ind;

	var outcome = (req.query.count==counter) ? "Wrong":"";

	//Decide the color
	var ccolor = {
		"a" : (counter > 0) ? "green":"red",
	  	"b" : (counter > 1) ? "green":"red",
	  	"c" : (counter > 2) ? "green":"red",
	};

	res.render('puzzle', {"puzzle" : chosen, "count" : counter, "ccolor" : ccolor, "outcome" : outcome});
}