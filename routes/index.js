'use strict';

//var express = require('express');
//var RequestHandler = require('../controllers/requestHandlers')
var url = require('url');
// var mongodata = require('../controllers/dataController');

//var util = require('util');

module.exports = function(app) {

	// show authantication home page
	app.get('/', function(req, res) {

		res.send(200, 'index.ejs');
	});


};
