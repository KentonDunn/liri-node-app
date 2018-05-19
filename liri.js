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




//COMMANDS FOR LIRI BOT
//-------------------------------------------------------
if (inputString == "my-tweets") {
  console.log("Stay off Twitter!");
} else if (inputString == "spotify-this-song") {

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


  /* Retrieve an access token and a refresh token
  spotify.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotify.setAccessToken(data.body["access_token"]);

      //This code gets Elvis information.
      spotify
        .getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE", {
          limit: 1
        })
        .then(function (data) {
          return data.body.items.map(function (a) {
            return a.id;
          });
        })
        .then(function (albums) {
          return spotify.getAlbums(albums);
        })
        .then(function (data) {
          console.log(data.body);
        });
      //end of spotify.getArtistAlbums Search for Elvis information
      //-----------------------------------------------------------

      spotify.searchTracks('Love', function (err, data) {
        if (err) {
          console.error("Something went wrong", err.message);
          return;
        }

        // Print some information about the results
        console.log("I got " + data.body.tracks.total + " results!");

        // Go through the first page of results
        var firstPage = data.body.tracks.items;
        console.log(
          "The tracks in the first page are.. (popularity in parentheses)"
        );

        /*
         * 0: All of Me (97)
         * 1: My Love (91)
         * 2: I Love This Life (78)
         * ...
         
        firstPage.forEach(function (track, index) {
          console.log(index + ": " + track.name + " (" + track.popularity + ")");
        });


      });

    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
*/

} else if (inputString == "movie-this") {
  console.log("Is it better than the Matrix?");
  // Then run a request to the OMDB API with the movie specified
  request(
    "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy",
    function (error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      }
    }
  );
} else if (inputString == "do-what-it-says") {
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
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);
  });
} else {
  console.log("Input Command Not Recognized");
}