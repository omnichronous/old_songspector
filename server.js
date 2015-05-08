// grab packages
// ===
var express = require('express');
var app = express();
var mm = require('metalminer');
var Youtube = require("youtube-api");

var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
  api_key: 'fe71acb5ea15cc92ba976ae34afd9beb',
  secret: 'd54b892df4accc92262e298f670be789'
});

// configure the app
// ===
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set YouTube authentication
Youtube.authenticate({
    type: "key"
  , key: "AIzaSyBP0ExnBq7md76rQSvZfsviYXz9C9bIELQ"
});

// route views
// ===
// home view
app.get('/', function(req, res) {
  res.render('pages/index');
});

// user view
app.get('/:user', function(req, res) {
  var errors = [];

  // Get now playing
  lfm.user.getRecentTracks({user:req.params.user,limit:"1"}, function(err, recentTracks) {
    if (err) {
      //console.log("No currently playing track detected");
      errors["nowPlayingStatus"] = "No currently playing track detected";
    }

    // check for now playing
    // get current track parameters if we get a positive result
    // will throw an error otherwise
    if (recentTracks) {
      var title = recentTracks.track[0].name;
      var artist = recentTracks.track[0].artist["#text"];
      var album = recentTracks.track[0].album["#text"];

    // get lyrics
    mm.getLyrics({
      title: title,
      artist: artist,
      album: album
    }, function (err, lyricResults) {
        if (err) {
          //console.log("No lyrics found");
          errors["lyricsStatus"] = "No lyrics found";
        }

        // get videos
        Youtube.search.list({
          "part": "id,snippet",
          "q": artist+"+"+title+"+official",
          "maxResults": 11,
          "type": "video"
        },
        function (err, videoResults) {
          if (err) {
            //console.log("No videos found");
            errors["videosStatus"] = "No videos found";
          }

          res.render('pages/dashboard', { lyrics: lyricResults, videos: videoResults, errors: errors });

        });
      });

    } // end of now playing check

    else { res.render('pages/dashboard', { errors: errors }); }

  });

});

// start the server
// valid for OpenShift
// ===
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});