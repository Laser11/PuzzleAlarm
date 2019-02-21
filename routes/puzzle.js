var puzzleData = require('../puzzles.json');
var musicData = require('../music.json');

/*
 * GET puzzle page and alarm
 */
exports.viewA = function(req, res){
  renderPuzzle(req,res,Math.floor(Math.random() * puzzleData.puzzles.length),0,"hidden",true);
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
  renderPuzzle(req,res,index,counter,req.query.visibility,true);
}


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
  if (wantSong) {
    var songPath = songJSON.path;
  } else {
    var songPath = "";
  }
	res.render('puzzle', {"puzzle" : chosen, "count" : counter, "outcome" : outcome, "visible": visible, "songPath" : songPath});
  
}