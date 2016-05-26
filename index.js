//node/express setup

var express = require('express');
var app = express();
require('dotenv').config();
var http = require('http').Server(app);
// var Uber = require('node-uber');
var request = require('request'); //for serverside http requests
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// need to add this so that we can accept request payloads
app.use(bodyParser.json());
var path = require('path');
var views = path.join(process.cwd(), "views");

//middle-ware
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


//routes
app.get('/', function(req, res){
  res.sendFile(views + '/index.html');
});

app.get('/test', function(req, res){

  request('https://maps.googleapis.com/maps/api/directions/json?origin=sanfrancisco&destination=dailycity&key=AIzaSyAwtMDXCmDiBxw9iI-yQV1Qc_sGwcBVzZ0',
    function (error, response, body) {
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
      console.log("The Response: ", response.statusCode);
      console.log("The Body: ", body);
      res.send(body);
    }
  });

});

app.get('/data', function(req, res){

  request('https://api.uber.com/v1/estimates/price?start_latitude=37.7909&start_longitude=-122.4016&end_latitude=37.785114&end_longitude=-122.406677&server_token='
     + process.env.UBER_SERVER_TOKEN, function (error, response, body) {
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.get('/route', function(req, res){
  request('https://maps.googleapis.com/maps/api/directions/json?origin=225_bush_st,sanfrancisco&destination=3_hart_lane,mill_valley&key=AIzaSyAwtMDXCmDiBxw9iI-yQV1Qc_sGwcBVzZ0',
    function (error, response, body) {
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.post('/route', function(req, res){
  console.log("post request: ", req.body);
  request('https://maps.googleapis.com/maps/api/directions/json?origin=' + encodeURIComponent(req.body.start) + '&destination=' + encodeURIComponent(req.body.end) + '&key=AIzaSyAwtMDXCmDiBxw9iI-yQV1Qc_sGwcBVzZ0',
    function (error, response, body) {
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.post('/data', function(req, res){
  console.log("fetching new ride data for: ", req.body);
  request('https://api.uber.com/v1/estimates/price?start_latitude=' + req.body.start.latitude + '&start_longitude=' + req.body.start.longitude + '&end_latitude=' + req.body.end.latitude + '&end_longitude=' + req.body.end.longitude + '&server_token='
     + process.env.UBER_SERVER_TOKEN, function (error, response, body) {
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});



//start the server
http.listen(process.env.PORT || 3000, function(){
	console.log("RideMap is listening on port " + (process.env.PORT || 3000));
});
