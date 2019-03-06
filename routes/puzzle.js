var puzzleData = require('../puzzles.json');
var musicData = require('../music.json');
var clocks = require('../clocks.json');



var clockName = '';

/*
 * GET puzzle page and alarm
 */
 exports.viewAltA = function(req, res){
  renderPuzzleFromClock(req,res,true);
 }

 exports.viewAltB = function(req, res){
  renderPuzzleFromClock(req,res,false);
 }
function renderPuzzleFromClock(req,res,snoozeON) {
  var name = req.query.name;
  //Searches the json for the clock with the name
  for (var i=0; i<clocks.alarms.length; i++) {
    //Disables the clock
    if (clocks.alarms[i].name == name) {
      clockName = name;
      clocks.alarms[i].online = false;
    }
    
  }

  //Render the puzzle page
  renderPuzzle(req,res,"hidden",true,snoozeON);
};

// GET puzzle page without alarm
exports.viewA = function(req, res){
  //Render the puzzle page
  renderPuzzle(req,res,"visible",false,true);
};

// GET puzzle page without alarm
exports.viewB = function(req, res){
  //Render the puzzle page
  renderPuzzle(req,res,"visible",false,false);
};

function renderPuzzle(req,res,exitVisible,wantSong,snoozeON) {


  //Get the song
  var songID = parseInt(req.params.songID);
  var songJSON = musicData.songs[songID];
  var songPath = "";

  if (wantSong) {
    songPath = songJSON.path;
  }
  
  res.render('puzzle', {"name" : clockName , "visible": exitVisible, "songPath" : songPath, "snoozeON" : snoozeON});
  
}