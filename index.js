var express = require('express');
var app = express();
require('dotenv').config();
var http = require('http').Server(app);
var Uber = require('node-uber');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
var views = path.join(process.cwd(), "views");
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// var uber = new Uber({
//   client_id: process.env.UBER_CLIENT_ID,
//   client_secret: process.env.UBER_CLIENT_SECRET,
//   server_token: process.env.UBER_SERVER_TOKEN,
//   redirect_uri: 'REDIRECT URL',
//   name: 'NicksRideMap',
//   language: 'en_US', // optional, defaults to en_US
//   sandbox: true // optional, defaults to false
// });

app.get('/', function(req, res){
  res.sendFile(views + '/index.html');
});

app.get('/data', function(req, res){
  console.log(process.env.TEST_DATA);

  request('https://api.uber.com/v1/estimates/price?start_latitude=37.625732&start_longitude=-122.377807&end_latitude=37.785114&end_longitude=-122.406677&server_token='
     + process.env.UBER_SERVER_TOKEN, function (error, response, body) {
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  })
});


http.listen(process.env.PORT || 3000, function(){
	console.log("RideMap is listening on port " + (process.env.PORT || 3000));
});
