var express = require('express');
var app = express();
require('dotenv').config();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var views = path.join(process.cwd(), "views");
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

app.get('/', function(req, res){
  res.sendFile(views + '/index.html');
});

app.get('/data', function(req, res){
  console.log(process.env.TEST_DATA)
  res.send(process.env.TEST_DATA);
});


http.listen(process.env.PORT || 3000, function(){
	console.log("RideMap is listening on port " + (process.env.PORT || 3000));
});
