var puzzleData = require('../puzzles.json');
var musicData = require('../music.json');
var clocks = require('../clocks.json');
/*
 * GET puzzle page and alarm
 */
 exports.viewAlt = function(req, res){
  var name = req.query.name;
  //Searches the json for the clock with the name
  for (var i=0; i<clocks.alarms.length; i++) {
    //Disables the clock
      console.log(name);
    if (clocks.alarms[i].name == name) {
      clocks.alarms[i].online = false;
      console.log(clocks.alarms[i].online);
    }
    
  }

  //Render the puzzle page
  renderPuzzle(req,res,"hidden",true);
};

// GET puzzle page without alarm
exports.view = function(req, res){


  //Render the puzzle page
  renderPuzzle(req,res,"visible",false);
};

function renderPuzzle(req,res,visible,wantSong) {


  //Get the song
  var songID = parseInt(req.params.songID);
  var songJSON = musicData.songs[songID];
  var songPath = "";

  if (wantSong) {
    songPath = songJSON.path;
  }
  
  res.render('puzzle', {"visible": visible, "songPath" : songPath});
  
}