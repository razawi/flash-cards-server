var models = require('../models/models');
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require ("fs");
var async = require("async");

var curricula = models.Curricula;
var category = models.Category;
var card = models.Card;
var face = {};


// ********** for conversion ************
var Schema = mongoose.Schema;

var subCategorySchema = new Schema({
  curricula:  [{ type: Schema.Types.ObjectId, ref: 'Curricula' }],
  admins: String,
  name: String,
});

var subCategory = mongoose.model('subCategory', subCategorySchema);

// ******************************************

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});
mongoose.connect('mongodb://raz:razdev@ds049925.mongolab.com:49925/cards-dev');

var http = require('http');
const PORT=8080; 

function getCollections(request, response){

    response.setHeader("Content-Type", "application/json; charset=utf-8");

    // promises
    var res = "";
    async.parallel([
        function (){
            curricula.find({ }, function(err, result){
                if (err) {response.write(err)}
                else{
                    fs.writeFile("../assets/curricula.json", result, function(err) {
                        if (err) {
                            console.log ('file err ' + err)
                            response.write(err)
                        }
                    }); 
                }
            })
        },
        function (){
            subCategory.find({ }, function(err, result){
                if (err) {response.write(err)}
                else{
                    // _.omit new structure
                    // save to file

                    fs.writeFile("../assets/subCategory.json", result, function(err) {
                        if (err) {
                            console.log ('file err ' + err)
                            response.write(err)
                        }
                    }); 
                }
            })
        },
        function (){
            card.find({ }, function(err, result){
                if (err) {response.write(err)}
                else{
                    fs.writeFile("../assets/card.json", result, function(err) {
                        if (err) {
                            console.log ('file err ' + err)
                            response.write(err)
                        }
                        response.write("Great Success");
                    }); 
                }
            })
        }
    ], function (){
        response.write("Great Success");
    });
}

//Create a server
var server = http.createServer(getCollections);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
