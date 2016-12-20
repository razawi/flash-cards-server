var models = require('../models/models');
var mongoose = require('mongoose');
_ = require('lodash');
fs = require ("fs");
async = require("async");
$ = require("jquery");

const configDB = require('../config/database');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});

mongoose.connect(configDB.url);

mcurricula = models.Curricula;
mcategory = models.Category;
mcard = models.Card;
face = {};

fcards = require('../assets/mocha-card.json');
fcategory = require('../assets/mocha-category.json');
fcurricula = require('../assets/mocha-curricula.json');


function initDB(){

    initCurricula()

    console.log('DB Inited');

    //      initCurricula
    //      initCategory - currentlu curricula is empty
    //      initCards - seems to be to much info, adjust

    debugger;
}

function  initCurricula(){

    function* entries(obj) {
        for (let key of Object.keys(obj)) {
            debugger;

            var curricula = new mcurricula({
                name : obj[key].name,
                admins : obj[key].admins,
                facess : []
            });

            _.fill(curricula.facess, obj[key].facess);

            yield curricula;
        }
    }


    // create and iterator object
    let iterator = entries(fcurricula);

    var next = iterator.next(); 

     
        next.value.save(function(err, next) {
            if (err) throw err; // yield err ??

            else{
                console.log('Curriculum created!');  
                next = iterator.next(); 
            }
        });

       

}

setTimeout( initDB, 100);

// var el = document.createElement('script');
// el.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js";
// el.type = "text/javascript";
// document.head.appendChild(el);

