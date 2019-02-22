var puzzleData = require('../puzzles.json');
var musicData = require('../music.json');
var clocks = require('../clocks.json');
/*
 * GET puzzle page and alarm
 */
exports.viewAlt = function(req, res){
  var name = req.query.name;
  //Searches the json for the clock with the name
  for (var i=0; !isNaN(name) && i<clocks.alarms.length; i++) {
    //Disables the clock
    if (clocks.alarms[i].name == name) {
      clocks.alarms[i].online = "OFF";
    }
    
  }

  //Render the puzzle page
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0,"hidden",true);
};

// GET puzzle page without alarm
exports.view = function(req, res){


  //Render the puzzle page
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