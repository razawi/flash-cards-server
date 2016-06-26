var express      = require('express');
var bodyParser   = require('body-parser');
var path 	     = require('path');
var configDB     = require('./config/database');

var app = module.exports = express();
var port = process.env.PORT || 8888;

// app.use(cookieParser()); 
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*"); TODO : removeme
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var port = process.env.PORT || 8888;
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

require('./routes/index')(app); 

// Start the server
app.listen(port);
console.log('Server started on port ' + port);

// ctach DB errors
//function mongoInit(){
//  console.log("mongo Init");
//  var db = mongoose.connection;
//  db.on('error', console.error.bind(console, 'mongodb connection error:'));
//  db.once('open', function (callback) {
//    console.log("mongo connection open");
//  });
//}

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports.app = app;

exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};