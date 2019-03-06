var clocks = require("../clocks.json");
var music = require("../music.json");

/*
 * GET clock creation page.
 */
exports.view = function(req, res){
  //Extract which alarm we're using
  var name = req.query.name;
  //Create a deep copy of the music json
  songs = JSON.parse(JSON.stringify(music.songs));

  //Searches the json for the group with the name
  for (var i=0; i<clocks.alarms.length; i++) {
  	//Renders the clock fields
  	if (clocks.alarms[i].name == name) {
      var songID = parseInt(clocks.alarms[i].song);

      if (isNaN(songID)) songID = 0;

      songs[songID].isChecked = "selected";
  		res.render('create', {"clocks" : clocks.alarms[i], "songs" : songs, editing: true});
  		return;
  	}
    
  }
  songs[0].isChecked = "selected";
  var defaultClock = {
        "name" : "",
        "rawTime" : "00:00",
        "time" : "12:00 AM",
        "rawDate" : "2019-01-01",
        "date" : "01/01/2019",
        "online" : true,
        "songID" : "0",
        
        "puzzles" : {
            "mathCheck" : "",
            "memoryCheck" : ""
        },

        "difficulty" : {
            "choice" : "easy",
            "easyCheck" : "checked",
            "medCheck" : "",
            "hardCheck" : ""
        }

    };
  res.render('create', {"clocks" : defaultClock, "songs" : songs, editing: false});
  
};