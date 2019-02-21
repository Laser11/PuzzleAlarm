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
      var onlineChecked = "";

      if (isNaN(songID)) songID = 0;

      if (clocks.alarms[i].online == "OFF") onlineChecked = "checked";

      songs[songID].isChecked = "selected";
  		res.render('create', {"clocks" : clocks.alarms[i], "songs" : songs, "offlineChecked" : onlineChecked });
  		return;
  	}
    
  }
  var defaultClock = {
        "name" : "",
        "rawTime" : "00:00",
        "time" : "12:00 AM",
        "date" : "1970-01-01",
        "online" : "ON",
        "songID" : "0",
        "singleUse" : "checked",
        
        "week" : {
            "monCheck" : "",
            "tuesCheck" : "",
            "wedCheck" : "",
            "thursCheck" : "",
            "friCheck" : "",
            "satCheck" : "",
            "sunCheck" : "",
            "text" : ""
        },

        "puzzles" : {
            "triviaCheck" : "",
            "mathCheck" : "",
            "memoryCheck" : ""
        },

        "difficulty" : {
            "choice" : "",
            "easyCheck" : "",
            "medCheck" : "",
            "hardCheck" : ""
        }

    };
  res.render('create', {"clocks" : defaultClock, "songs" : songs, "offlineChecked" : "checked" });
  
};