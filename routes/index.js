//var express = require('express');
//var RequestHandler = require('../controllers/requestHandlers')
var url = require('url');

// var mongodata = require('../controllers/dataController');

//var util = require('util');

module.exports = function(app) {

	app.get('/ping', function(req, res) {

		res.status(200).send('pong');
	});

	app.get('/login', authenticate, function (req, res) {
		var token = jwt.sign({
			username: user.username
		}, jwtSecret);
		res.send({
			token: token,
			user: user
		});
	});


	app.get('/random-user', function (req, res) {
		var user = faker.Helpers.userCard();
		user.avatar = faker.Image.avatar();
		res.json(user);
	});

};
