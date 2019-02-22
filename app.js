
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var fs = require('fs');

var login = require('./routes/login');
var index = require('./routes/index');

var create = require('./routes/create');
var add = require('./routes/add');
var remove = require('./routes/remove');

var help = require('./routes/help');
var puzzle = require('./routes/puzzle');
var music = require('./routes/music');
var puzzleLoader = require('./routes/puzzleLoader');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/index', index.view);
app.get('/create', create.view);
app.get('/create/add', add.addClock);
app.get('/remove', remove.removeClock);
app.get('/help',help.view);

app.get('/puzzle',puzzle.view);
app.get('/puzzle/:songID', puzzle.viewAlt);

//app.get('/music/:songpath', music.loadMusic)
app.get('/music/:songpath', (req,res) => {
	songPath = __dirname + '/soundFiles/' + req.params.songpath
	res.setHeader("Content-Type", "audio/mpeg");
	fs.createReadStream(songPath).pipe(res);
});
app.get('/json/puzzles',puzzleLoader.puzzleInfo);

//app.get('/', loginPage.view);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
