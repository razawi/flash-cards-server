'use strict';

var models = require('../models/models');
var mongoose = require('mongoose');

// fs = require ("fs");
const configDB = require('../config/database');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function (callback) {
    console.log("mongo connection open");
});

mongoose.connect(configDB.url);



var fcards = require('../assets/arab-card.json');
var fcategory = require('../assets/arab-category.json');
var fcurricula = require('../assets/arab-curricula.json');

var mcurricula = models.Curricula;
var mcategory = models.Category;
var mcard = models.Card;
var face = {};

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

        var category = new mcategory({
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

        var card = new mcard({
            _id : obj[key]._id,
            name : obj[key].name,
            category: JSON.parse(JSON.stringify(obj[key].category)),
            facess : JSON.parse(JSON.stringify(obj[key].facess))
        });

        yield card;
    }
}

let curiculaIterator = entriesCuric(fcurricula);
let cardIterator = entriesCard(fcards);
let categoryIterator = entriesCategory(fcategory);

function saveNextCard(){ 

    var nextCard  = cardIterator.next(); 
    if (nextCard.value){
        nextCard.value.save(function(err) {
            if (err) throw err;  
        });
    } else{
        clearInterval(cardInterval);
        console.log('Cards Init done')
    } 
}

function saveNextCategory(){ 

    var nextCategory  = categoryIterator.next();  
    if (nextCategory.value){  
        nextCategory.value.save(function(err) {
            if (err) throw err; 
        });
    } else{
        clearInterval(categoryInterval);
        console.log('Categories Init done')
    }  
}

function saveNextCuricula(){ 

    var nextCuric  = curiculaIterator.next();  
    if (nextCuric.value){      
        nextCuric.value.save(function(err) {
            if (err) throw err;  
        }); 
    } else{
        clearInterval(curriculaInterval);
        console.log('Curriculas Init done')
    } 
}

var cardInterval = setInterval (saveNextCard, 108);
var categoryInterval = setInterval (saveNextCategory, 228);
var curriculaInterval = setInterval (saveNextCuricula, 265);

/* later */

// var el = document.createElement('script');
// el.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js";
// el.type = "text/javascript";
// document.head.appendChild(el);

