var http = require('http');
const PORT=8080;

var models = require('../models/models');
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require ("fs");
var async = require("async");

var curricula = models.Curricula;
var category = models.Category;
var card = models.Card;
var face = {};

// var el = document.createElement('script');
// el.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js";
// el.type = "text/javascript";
// document.head.appendChild(el);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});

mongoose.connect('mongodb://raz:razdev@ds049925.mongolab.com:49925/cards-dev');
 

// function getCollections(request, response){
function getCollections(){
    async.parallel([
        function (callback){
            curricula.find({ }, function(err, result){
                if (err) 
                    console.log(err)
                else{
                    fs.writeFile("../assets/curricula.json", JSON.stringify(result), function(err) {
                        if (err) 
                            console.log ('file err ' + err)
                        
                        callback();
                    }); 
                }
            })
        },
        function (callback){
            subCategory.find({ }, function(err, result){
                if (err)
                    console.log(err)
                else{
                    fs.writeFile("../assets/subCategory.json", JSON.stringify(result), function(err) {
                        if (err) {
                            console.log ('file err ' + err)
                            response.write(err)
                        }
                        callback();
                    }); 
                }
            })
        },
        function (callback){
            card.find({ }, function(err, result){
                if (err) 
                    console.log(err)
                else{
                    fs.writeFile("../assets/card.json", JSON.stringify(result), function(err) {
                        if (err) 
                            console.log ('file err ' + err)
                        
                        callback();
                    }); 
                }
            })
        }
    ], function done(err, results) {
        if(err) console.log("error ", err);
        console.log("DB Backeup Finished!");
        // response.write("Great Success");
    });
}

// backup
setTimeout( getCollections, 1000);

