var models = require('../models/models');
var mongoose = require('mongoose');

// async = require("async");
// $ = require("jquery");
// _ = require('lodash');

fs = require ("fs");
const configDB = require('../config/database');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});

mongoose.connect(configDB.url);

fcards = require('../assets/mocha-card.json');
fcategory = require('../assets/mocha-category.json');
fcurricula = require('../assets/mocha-curricula.json');

mcurricula = models.Curricula;
mcategory = models.Category;
mcard = models.Card;
face = {};

function* entriesCuric(obj) {
    for (let key of Object.keys(obj)) {

        var curricula = new mcurricula({
            _id : obj[key]._id,
            name : obj[key].name,
            admins : obj[key].admins,
            facess : JSON.parse(JSON.stringify(obj[key].facess))
        });

        yield curricula;
    }
}

function* entriesCategory(obj) {
    for (let key of Object.keys(obj)) {

        var category = new mcurricula({
            _id : obj[key]._id,
            name : obj[key].name,
            symbol : obj[key].symbol,
            curricula : JSON.parse(JSON.stringify(obj[key].curricula)),
            facess : JSON.parse(JSON.stringify(obj[key].facess))
        });

        yield category;
    }
}



function* entriesCard(obj) {
    for (let key of Object.keys(obj)) {

        var card = new mcurricula({
            _id : obj[key]._id,
            name : obj[key].name,
            category: JSON.parse(JSON.stringify(obj[key].category)),
            facess : JSON.parse(JSON.stringify(obj[key].facess))
        });

        yield card;
    }
}





function initCurricula(){
    let curiculaIterator = entriesCuric(fcurricula);
    var nextCuric  = curiculaIterator.next(); 

    nextCuric.value.save(function(err) {
        if (err) throw err; 
        else console.log('Curriculum created! ' + Date.now());  
    });


    // let cardIterator = entriesCard(fcards);
    // var nextCard  = cardIterator.next(); 
    // nextCard.value.save(function(err) {
    //     if (err) throw err; 
    //     else console.log('Card created! ' + Date.now());  
    // });

    // let categoryIterator = entriesCategory(fcategory);
    // var nextCategory  = categoryIterator.next(); 
    // nextCategory.value.save(function(err) {
    //     if (err) throw err; 
    //     else console.log('Category created! ' + Date.now());  
    // });




    // setInterval while next has value ?
    // var intervalID = window.setInterval(myCallback, 500);

    // function myCallback() {
    //     // Your code here
    //     // how do I halt the Interval ?
    // }

    // setInterval CurriculaProcessor(iterator), 100
    //     function CurriculaProcessor knows iterator
    //     if (nextval.value)
    //     {
    //         var next  = iterator.next(); 
    //         next.value.save(function(err) {
    //             if (err) throw err; 
    //             else console.log('Curriculum created! ' + Date.now());  
    //         });
    //     }
    //     else
    //         haltInterval
}



function initDB(){
    initCurricula()
//  initCategory - currentlu curricula is empty
//  initCards - seems to be to much info, adjust
}

setTimeout( initDB, 100);

// var el = document.createElement('script');
// el.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js";
// el.type = "text/javascript";
// document.head.appendChild(el);

