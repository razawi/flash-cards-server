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

// ********** for conversion ************
var Schema = mongoose.Schema;

var subCategorySchema = new Schema({
  curricula:  [{ type: Schema.Types.ObjectId, ref: 'Curricula' }],
  admins: String,
  name: String,
});

// var categorySchema = new Schema({
//   curricula:  [{ type: Schema.Types.ObjectId, ref: 'Curricula' }],
//   symbol: String,
//   name: String,
//   facess : [{
//     ordernum : Number,
//     symbol : String,
//     text : String,
//     sound : Boolean,
//     previewDisplay : Boolean
//   }]
// });

var subCategory = mongoose.model('subCategory', subCategorySchema);

// ******************************************

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});
mongoose.connect('mongodb://raz:razdev@ds049925.mongolab.com:49925/cards-dev');
 

function getCollections(request, response){

    async.parallel([
        function (callback){
            curricula.find({ }, function(err, result){
                if (err) {response.write(err)}
                else{
                    fs.writeFile("../assets/curricula.json", JSON.stringify(result), function(err) {
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
            subCategory.find({ }, function(err, result){
                if (err) {response.write(err)}
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
                if (err) {response.write(err)}
                else{
                    fs.writeFile("../assets/card.json", JSON.stringify(result), function(err) {
                        if (err) {
                            console.log ('file err ' + err)
                            response.write(err)
                        }
                        callback();
                        
                    }); 
                }
            })
        }
    ], function done(err, results) {
        if(err) console.log("error ", err);
        console.log("End op async");
        response.write("Great Success");
    });
}

//Create a server
var server = http.createServer(getCollections);

server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. 
    console.log("Server listening on: http://localhost:%s", PORT);
});
