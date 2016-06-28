'use strict';

const models = require('../models/models');
const mongoose = require('mongoose');
const fs = require ("fs"); // remove me

// get db data from config, open connection

// add db json dump, save as orig-heb-arb-dict.json

// make db json write

// dump old function and files

var file = param || '../res/carddb.json'

function InitCardsDb() {

    var prettyjson = require('prettyjson');
    var jsondb = "";

    // console.log("InitJSONDB");
    var dbsource = fs.readFileSync(file, "utf-8");
    jsondb = JSON.parse(dbsource.toString('utf8'));

    var curricula = models.Curricula;
    var category = models.Subcategory;
    var card = models.Card;
    var face = {};

    var categorys = [];
    var curriculas = [];
    var TBDFace = [{
        ordernum : 0,
        symbol  : 'TBD',
        text : 'TBD',
        sound  : false,
        previewDisplay : false
    }];

    function mapObjects(obj) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;

            if(i == 'type' && obj[i] == "Curriculum"){
                var arabic = new curricula({
                    name : obj['text'],
                    admins : 'raz',
                    facess : TBDFace
                });

                curriculas.push(arabic);

                arabic.save(function(err) {
                    if (err) throw err;

                    //console.log('Curriculum created!');
                });
            }

            if(i == 'type' && obj[i] == "Lesson"){
                var lesson = new category({
                    symbol : obj['text'],
                    curricula : curriculas[0],
                    facess : TBDFace
                })

                lesson.save(function(err) {
                    if (err) throw err;

                    //console.log('Lesson created!');
                });

                categorys.push(lesson);
            }

            if(i == 'type' && obj[i] == "word"){

                var facess = [];
                var face1 = {}, face2 = {}, face3  = {};

                face1.ordernum = obj["heb"]["ordernum"];
                face1.symbol = obj["heb"]["symbol"];
                face1.text = obj["heb"]["text"];
                face1.sound = false;
                face1.previewDisplay = obj["heb"]["previewDisplay"];

                face2.ordernum = obj["eng"]["ordernum"];
                face2.symbol = obj["eng"]["symbol"];
                face2.text = obj["eng"]["text"];
                face2.sound = false;
                face2.previewDisplay = obj["eng"]["previewDisplay"];

                facess.push(face2);

                face3.ordernum = obj["arb"]["ordernum"];
                face3.symbol = obj["arb"]["symbol"];
                face3.text = obj["arb"]["text"];
                face3.sound = false;
                face3.previewDisplay = obj["arb"]["previewDisplay"];

                facess.push(face3);
                facess.push(face1);

                var word = new card({
                    subcategory : categorys[categorys.length -1],
                    name : obj["heb"]["text"], //symbol
                    facess : facess
                });

                word.save(function(err) {
                    if (err) throw err;

                    // console.log('word created!');
                });
            }

            if (typeof obj[i] == 'object') {
                mapObjects(obj[i]);
            }
        }
    }

    mapObjects(jsondb);
}