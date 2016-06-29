const express = require('express');
const RequestHandler = require('../controllers/requestHandlers')
const url = require('url');
const co = require('co');
const util = require('util');

const mongodata = require('../controllers/dataController');
const router = module.exports = express.Router();

router.get('/health', co.wrap(function *(req, res) {
    return res.status(200).send('helth chack');
}));

router.get('/ping', function(req, res) {
    res.status(200).send('pong')
});

router.route('/card')
    .post(function(req, res) {
        mongodata.addCard(req.body, res);
	})
    .delete(function(req, res) {
        mongodata.deleteCard(req.body, res);
	})
    .get(function(req, res) {
        mongodata.getCard(req.body, res);
    });

router.route('/category')
    .post(function(req, res) {
        mongodata.addCategory(req.body, res);
    })
    .delete(function(req, res) {
        mongodata.deleteCategory(req.body, res);
    })
    .get(function(req, res) {
        mongodata.getCategory(req.body, res);
    });

router.route('/curricula')
    .post(function(req, res) { // New Mongo ??
        mongodata.addCurricula(req.body, res);
    })
    .delete(function(req, res) {
        mongodata.deleteCurricula(req.body, res);
    })
    .get(function(req, res) {
        mongodata.getCurricula(req.body, res);
    });

