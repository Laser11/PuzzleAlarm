var data = require('../puzzles.json');

exports.puzzleInfo = function(req, res) { 
	var nextVal;
	var i = 1;
	/*
	while(i < data.puzzles.length + 1) {
		nextVal = Math.floor(Math.random() * data.puzzles.length) + 1;
  	console.log(nextVal);
  	console.log(data.puzzles[nextVal - 1].type);

		if(data.puzzles[nextVal].type == "math") {
			break;
		}
		i++;
	}*/




	var puzzleID = Math.floor(Math.random() * data.puzzles.length) + 1;



  	var puzzle = data.puzzles[puzzleID - 1]; // of by one, our first project has index 0
  	console.log(puzzle);
  	res.json(puzzle);
  }