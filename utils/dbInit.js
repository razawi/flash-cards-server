var models = require('../models/models');
var mongoose = require('mongoose');
_ = require('lodash');
fs = require ("fs");
async = require("async");
$ = require("jquery");

const configDB = require('../config/database');

mcurricula = models.Curricula;
mcategory = models.Category;
mcard = models.Card;
face = {};

fcards = require('../assets/mocha-card.json');
fcategory = require('../assets/mocha-category.json');
fcurricula = require('../assets/mocha-curricula.json');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});

mongoose.connect(configDB.url);


function initDB(){

    initCurricula()

    console.log('DB Inited');

    // async 
    //      initCurricula
    //      initCategory - currentlu curricula is empty
    //      initCards - seems to be to much info, adjust

    debugger;
}

function  initCurricula(){

    $.each(fcurricula, function(cur, b) {
        debugger;

    });
    // foreach curricula in file 

//     async.series([
//          function(callback) { ... },
//          function(callback) { ... }
//      ]);


}

setTimeout( initDB, 100);
// var el = document.createElement('script');
// el.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js";
// el.type = "text/javascript";
// document.head.appendChild(el);

