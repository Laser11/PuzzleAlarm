var data = require('../puzzles.json');
var clocks = require('../clocks.json');

exports.puzzleInfoRand = function(req, res) { 
	var puzzleID;
	var puzzle;


	puzzleID = Math.floor(Math.random() * data.puzzles.length);
	puzzle = data.puzzles[puzzleID];

	//Dynamically name the id of the puzzle
	puzzle.id = puzzleID;

  	res.json(puzzle);
  }
  exports.puzzleInfo = function(req, res) { 
	//Search clock for what puzzles are enabled
	var name = req.params.name;
	var using;
	//Searches the json for the clock with the name
	for (var i=0; i<clocks.alarms.length; i++) {
	  //Disables the clock
	  if (clocks.alarms[i].name == name) {
	    using = clocks.alarms[i];
	    console.log("Clock used: ");
	    console.log(using);
	  }
	   
	}


	//Check which categories are used
	isMath = (using.puzzles.mathCheck   == "checked");
	isMem  = (using.puzzles.memoryCheck == "checked");
	var puzzleID;
	var puzzle;
	console.log("Include math:");
	console.log(isMath);
	console.log("Include trivia:");
	console.log(isMem);
	//Look for puzzles matching the category, with a hard limit of 1000 random searches
	for (var i = 0; i < 1000; i++) {
		puzzleID = Math.floor(Math.random() * data.puzzles.length);
		puzzle = data.puzzles[puzzleID]; // of by one, our first project has index 0
		if (puzzle.type == "trivia" && isMem) {
			console.log("Returning trivia puzzle");
			break;
		}
		if (puzzle.type == "math" && isMath) {
			console.log("Returning math puzzle");
			break;
		}
	}
	//Dynamically name the id of the puzzle
	puzzle.id = puzzleID;
  	res.json(puzzle);
  }