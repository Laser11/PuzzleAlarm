//var projects = require('../projects.json');
var fs = require('fs');

exports.loadMusic = function(req, res) { 

	var songPath = '../soundFiles/' + req.params.songpath;
	/*
	if (projectID == "random") {
		projectID = Math.floor(Math.random() * projects.length) + 1;
	} else {
		projectID = parseInt(projectID);
	}

  	var project = projects[projectID-1]; // of by one, our first project has index 0
  	res.json(project);
  	*/
  	console.log('Looking for ' + songPath);
  	fs.exists(songPath,function(exists){
		if(exists)
		{
			res.setHeader("Content-Type", "audio/mpeg");
			console.log(songPath + " exists");
			var rstream = fs.createReadStream(songPath);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
}