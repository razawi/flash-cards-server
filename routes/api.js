var express = require('express');
//var RequestHandler = require('../controllers/requestHandlers')
const url = require('url');
const co = require('co');

// var mongodata = require('../controllers/dataController');

//var util = require('util');

const router = module.exports = express.Router();

router.get('/health', co.wrap(function *(req, res) {
    return res.status(200).send('helth chack');
}));

//router.get('/ping', function(req, res) {
//
//        res.status(200).send('pong')
//    });

