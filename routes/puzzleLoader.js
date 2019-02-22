var data = require('../puzzles.json');

exports.puzzleInfo = function(req, res) { 
	var puzzleID = Math.floor(Math.random() * data.puzzles.length) + 1;


  	var puzzle = data.puzzles[puzzleID-1]; // of by one, our first project has index 0
  	console.log(puzzle);
  	res.json(puzzle);
}