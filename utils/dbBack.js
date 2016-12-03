var models = require('../models/models');
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require ("fs");
var curricula = models.Curricula;
var category = models.Category;
var card = models.Card;
var face = {};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});
mongoose.connect('mongodb://raz:razdev@ds049925.mongolab.com:49925/cards-dev');

var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function getCollections(request, response){



     category.find({ }, function(err, result){
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        if (err) {response.write(err)}
        else{
            response.write(JSON.stringify(result));
        }
    }) // . then
    //      category.find({"name": body.name }, function(err, car){
    //     if (err) {res.json(err)}
    //     else{
    //         res.json( car);
    //     }
    // })
    //      curricula.find({"name": body.name }, function(err, car){
    //     if (err) {res.json(err)}
    //     else{
    //         res.json( car);
    //     }
    // })

//       res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
//   res.write(body, "utf-8");
//   res.end(); 


}

//Create a server
var server = http.createServer(getCollections);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});










// var connect = require('connect'),
//   mongo = require('mongodb');

// // Connect to a mongo database via URI
// // With the MongoLab addon the MONGOLAB_URI config variable is added to your
// // Heroku environment.  It can be accessed as process.env.MONGOLAB_URI
// mongo.connect('mongodb://raz:razdev@ds049925.mongolab.com:49925/cards-dev', {}, function(error, db){

//   // console.log will write to the heroku log which can be accessed via the 
//   // command line as "heroku logs"
//   db.addListener("error", function(error){
//     console.log("Error connecting to MongoLab");
//   });
  



// });