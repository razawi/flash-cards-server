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


// read file, write to db

// 3 files parse JSON and Iterate

// if fail, halt all

