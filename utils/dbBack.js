var models = require('../models/models');
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require ("fs");
var async = require("async");
const configDB = require('../config/database');

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

mongoose.connect(configDB.url);
 
function getCollections(){
    async.parallel([
        function (callback){
            curricula.find({ }, function(err, result){
                if (err) 
                    console.log(err)
                else{
                    fs.writeFile("./assets/curricula.json", JSON.stringify(result), function(err) {
                        if (err) 
                            console.log ('file err ' + err)
                        
                        callback();
                    }); 
                }
            })
        },
        function (callback){
            category.find({ }, function(err, result){
                if (err)
                    console.log(err)
                else{
                    fs.writeFile("./assets/category.json", JSON.stringify(result), function(err) {
                        if (err)
                            console.log ('file err ' + err)
                     
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
                    fs.writeFile("./assets/card.json", JSON.stringify(result), function(err) {
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
    });
}

setTimeout( getCollections, 1000);

