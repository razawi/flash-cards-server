//var express = require('express');
//var RequestHandler = require('../controllers/requestHandlers')
var url = require('url');

// var mongodata = require('../controllers/dataController');

//var util = require('util');

module.exports = function(app) {

	app.get('/ping', function(req, res) {

		res.status(200).send('pong');
	});

};
