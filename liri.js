require("dotenv").config();

// fs is a core Node package for reading and writing files
var fs = require("fs");

//var SpotifyWebApi = require("spotify-web-api-node");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require("./keys");
//console.log(keys);
var spotify = new Spotify({
  id: keys.spotify.clientId,
  secret: keys.spotify.clientSecret
})

//var spotify = new SpotifyWebApi(keys.spotify);
var client = new Twitter(keys.twitter);

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

var nodeArgs = process.argv;
var inputString = process.argv[2];
// fs is a core Node package for reading and writing files
var fs = require("fs");


//Functions for LIRI BOT
//-------------------------------------------------------------
function myTweets() {
  console.log("Stay off Twitter!");
  client.get('search/tweets', {
    q: 'urban_coder',

  }, function (error, tweets, response) {
    for (i = 0; i < tweets.statuses.length; i++) {
      if (i === 21) {
        break;

      }
      // log the actual tweet
      console.log(tweets.statuses[i].text);
      // logs when the tweet was created
      console.log(tweets.statuses[i].created_at);

    }

  });
}

function spotifyThis() {
  var songTitle = process.argv.slice(3).join(" ");

  spotify.search({
    type: 'track',
    query: songTitle,
    limit: '2',
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {

      var basicData = data.tracks.items[0];
      //console.log(basicData);
      basicData.preview_url = basicData.preview_url || "No preview link available for this song."
      console.log("Requested Song: " + songTitle.toUpperCase());
      console.log("Artist: " + basicData.album.artists[0].name);
      console.log("Preview Link to Song: " + basicData.preview_url);
      console.log("Album this track is on: " + basicData.album.name);
    }

  });

}

function movieCheck() {
  var movieTitle = process.argv.slice(3).join(" ");
  url = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

  console.log("Is it better than The Matrix?");
  // Then run a request to the OMDB API with the movie specified
  request(
    url,
    function (error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {

        var result = JSON.parse(body);

        const rtRating = result.Ratings[1];

        console.log("Title: " + result.Title + "\n" + "Year Released: " + result.Year + "\n" + "IMDB Rating: " + result.imdbRating + "\n" + "Rotten Tomatoes Rating: " + Object.entries(rtRating)[1].splice(1) + "\n" + "Country: " + result.Country + "\n" + "Language(s): " + result.Language + "\n" + "Plot: " + result.Plot + "\n" + "Actors: " + result.Actors);
      }
    }
  );

}

function doeetNow() {

  console.log("OK, OK, I'll do what it says!");
  // This block of code will read from the "random.txt" file.
  // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    //console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    //what I want to do is take the [0] and [1] information and have it run again in the command line.  trying to google how. 
    var command1 = dataArr[0];
    var command2 = dataArr[1];

    console.log(command1);
    spotifyThis(command1)
  });

}

//COMMANDS FOR LIRI BOT
//-------------------------------------------------------
if (inputString == "my-tweets") {
  myTweets();
} else if (inputString == "spotify-this-song") {
  spotifyThis();

} else if (inputString == "movie-this") {
  movieCheck();

} else if (inputString == "do-what-it-says") {
  doeetNow();

} else {
  console.log("Input Command Not Recognized");
}