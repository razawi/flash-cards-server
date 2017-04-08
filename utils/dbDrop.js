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


mongoose.connection.on('open', function(){
    mongoose.connection.db.dropDatabase(function (err) {
        console.log('db dropped');
        process.exit(0);
    });
})