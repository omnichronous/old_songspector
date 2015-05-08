// grab packages
// ===
var express = require('express');
var app = express();
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
  api_key: 'fe71acb5ea15cc92ba976ae34afd9beb',
  secret: 'd54b892df4accc92262e298f670be789'
});
var mm = require('metalminer');
var Youtube = require("youtube-api");
var async = require("async");

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

// Set now playing parameters
var params = {
  user: 'Shaddy',
  limit: '1'
}

var errors = [];

app.get('/', function(req, res) {

  // Get now playing
  lfm.user.getRecentTracks(params, function(err, recentTracks) {
    //if (err) { throw err; }
    if (err) {
      console.log("No currently playing track detected");
      errors.push("No currently playing track detected");
    }

    var title = recentTracks.track[0].name;
    var artist = recentTracks.track[0].artist["#text"];
    var album = recentTracks.track[0].album["#text"];

    // Get lyrics
    mm.getLyrics({
      title: title,
      artist: artist,
      album: album
    }, function (err, lyricResults) {
      if (err) { console.log("No lyrics found"); }

      // Get videos
      Youtube.search.list({
        "part": "id,snippet",
        "q": artist+"+"+title+"+official",
        "maxResults": 11
      },
      function (err, videoResults) {
        for (var i = 0; i < videoResults.items.length; i++) { 
          //console.log("Video info:");
          //console.log(data.items[i].snippet.title);
          //console.log(data.items[i].snippet.thumbnails.default.url);
          //console.log("Video ID:");
          //console.log(data.items[i].id.videoId);
          //console.log("Video link:");
          //console.log("https://www.youtube.com/watch?v="+data.items[i].id.videoId);
          //return "https://www.youtube.com/watch?v="+data.items[i].id.videoId;
        }
        var data = [recentTracks, lyricResults, videoResults, errors];
        res.render('pages/dashboard', { lyrics: lyricResults, videos: videoResults, errors: errors });
      });

      //return data;
      //verify(data);
    });

    /*getLyrics({
      title: title,
      artist: artist,
      album: album
    });*/

    /*getBandInfo({
      artist: artist,
      album: album
    });*/
    /*getSimilarArtists({
      artist: artist,
      album: album
    });*/
    /*getVideos(artist+"+"+title+"+official");*/
    //res.render('pages/dashboard', { lyrics: lyrics });
    /*verify(getLyrics({
      title: title,
      artist: artist,
      album: album
    }));*/ // debug

  });

});

// Get track lyrics
function getLyrics(metaInfo) {
  mm.getLyrics(metaInfo, function (err, data) {
    if (err) { throw err; }
    return data;
    //verify(data);
  });
}

// Get track artist info
function getBandInfo(metaInfo) {
  mm.getBandInfo(metaInfo, function (err, data) {
    if (err) { throw err; }
    return data;
    //verify(data);
  });
}

// Get similar artists
function getSimilarArtists(metaInfo) {
  mm.getSimilarArtists(metaInfo, function (err, data) {
    if (err) { throw err; }
    return data;
    //verify(data);
  });
}

// Get track videos
function getVideos(query) {
  Youtube.search.list({
    "part": "id,snippet",
    "q": query,
    "maxResults": 10
  },
  function (err, data) {
    for (var i = 0; i < data.items.length; i++) { 
      //console.log("Video info:");
      //console.log(data.items[i].snippet.title);
      //console.log(data.items[i].snippet.thumbnails.default.url);
      //console.log("Video ID:");
      //console.log(data.items[i].id.videoId);
      //console.log("Video link:");
      //console.log("https://www.youtube.com/watch?v="+data.items[i].id.videoId);
      return "https://www.youtube.com/watch?v="+data.items[i].id.videoId;
    }
  });
}

// Output function (for debugging)
function verify (output) {
  console.log(output);
}

// start the server
// ===
app.listen(8080);
console.log('App running!');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});