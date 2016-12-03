var models = require('../models/models');
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require ("fs");
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

     subCategory.find({ }, function(err, result){
        
        if (err) {response.write(err)}
        else{
            console.log('else');
            response.write(JSON.stringify(result));
        }
    })
    
    // after all are done, save to files

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


}

//Create a server
var server = http.createServer(getCollections);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
