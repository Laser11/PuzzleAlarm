var puzzleData = require('../puzzles.json');
var musicData = require('../music.json');

/*
 * GET puzzle page and alarm
 */
exports.viewAlt = function(req, res){
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0,"hidden",true);
};

// GET puzzle page without alarm
exports.view = function(req, res){
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0,"visible",false);
};

function renderPuzzle(req,res,ind,counter,visible,wantSong) {
	var chosen = puzzleData.puzzles[ind];
	chosen.id = ind;

	var outcome = (req.query.count==counter) ? "Wrong":"";

  //Get the song
  var songID = parseInt(req.params.songID);
  var songJSON = musicData.songs[songID];
  var songPath = "";

  if (wantSong) {
    songPath = songJSON.path;
  }
  
	res.render('puzzle', {"puzzle" : chosen, "count" : counter, "outcome" : outcome, "visible": visible, "songPath" : songPath});
  
}