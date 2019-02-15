var puzzleData = require('../puzzles.json');

/*
 * GET puzzle page and alarm
 */
exports.viewA = function(req, res){
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0,"hidden");
};

// GET puzzle page after answering a question
exports.viewB = function(req, res) {
  var ans = req.query.answer;
  var index = parseInt(req.query.id);
  var sol = puzzleData.puzzles[index].solution;
  var counter = parseInt(req.query.count);
  

  //Determine solution
  if (ans == sol) {
  	counter++;
    console.log(counter);
    if (counter > 2) {
      console.log('Success!');
      res.redirect('/index');
    }
    index = Math.floor(Math.random() * puzzleData.puzzles.length);
  } else {
  	
  }
  renderPuzzle(req,res,index,counter,req.query.visibility);
}


// GET puzzle page without alarm
exports.view = function(req, res){
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0,"visible");
};

function renderPuzzle(req,res,ind,counter,visible) {
	var chosen = puzzleData.puzzles[ind];
	chosen.id = ind;

	var outcome = (req.query.count==counter) ? "Wrong":"";

	//Decide the color
	var ccolor = {
		"a" : (counter > 0) ? "green":"red",
	  	"b" : (counter > 1) ? "green":"red",
	  	"c" : (counter > 2) ? "green":"red",
	};

  
	res.render('puzzle', {"puzzle" : chosen, "count" : counter, "ccolor" : ccolor, "outcome" : outcome, "visible": visible});
  
}