'use strict';

const express      = require('express');
const bodyParser   = require('body-parser');

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var faker = require('faker');
var cors = require('cors');

// const path 	     = require('path')
const mongoose = require('mongoose');
const configDB = require('./config/database');

var jwtSecret = 'fjkdlsajfoew239053/3uk';

var user = {
  username: 'raz',
  password: 'raz'
};

var app = module.exports = express();
const port = process.env.PORT || 8888;

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

mongoose.connect(configDB.url);
app.use('/api', require('./routes/api.js'));
app.use(expressJwt({ secret: jwtSecret }).unless({ path: [ '/login', '/ping']}));


	app.get('/ping', function(req, res) {
		res.status(200).send('pong');
	});

	app.post('/login', authenticate, function (req, res) {
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


app.listen(port);
console.log('Server started on port ' + port);

module.exports.app = app;

exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

// UTIL FUNCTIONS

function authenticate(req, res, next) {
  var body = req.body;
  console.log('authanticating req\n');
  if (!body.username || !body.password) {
    console.log('Must provide username or password');
    res.status(400).end('Must provide username or password');
  } else if (body.username !== user.username || body.password !== user.password) {
    console.log('Username or password incorrect');
    res.status(401).end('Username or password incorrect');
  } else {
    console.log('next');
    next();
  }
}

// var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ctach DB errors
// function mongoInit(){
//   console.log("mongo Init");
//   var db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'mongodb connection error:'));
//   db.once('open', function (callback) {
//     console.log("mongo connection open");
//   });
// }
// catch 404 and forward to error handler - dev only
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// // error handlers
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
// }

// //// production error handler
// //// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
// });
