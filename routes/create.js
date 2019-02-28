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
        "name" : "Jane Doe",
        "rawTime" : "00:00",
        "time" : "12:00 AM",
        "date" : "1970-01-01",
        "online" : true,
        "songID" : "0",
        "singleUse" : "checked",
        
        "week" : {
            "monCheck" : "checked",
            "tuesCheck" : "checked",
            "wedCheck" : "checked",
            "thursCheck" : "checked",
            "friCheck" : "checked",
            "satCheck" : "checked",
            "sunCheck" : "checked",
            "text" : "checked"
        },

        "puzzles" : {
            "triviaCheck" : "checked",
            "mathCheck" : "checked",
            "memoryCheck" : "checked"
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