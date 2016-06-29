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
	});



router.route('/category')
    .post(function(req, res) {
        mongodata.addCategory(req.body, res);
    });

router.route('/curricula')
    .post(function(req, res) { // New Mongo ??
        mongodata.addCurricula(req.body, res);
    });



//router.get('/categorys/:curiculumid', function(req, res) {
//	mongodata.categorysByCurricula(res, req.params.curiculumid);
//	// console.log('/categorys/curiculum:curiculumid : req.params.curiculumid  ' + req.params.curiculumid);
//});



//router.route('/cards/category/:categoryid')
//	.get(function(req, res) {
//		mongodata.cardsByCategory(res, req.params.categoryid);
//		console.log ('/cards/category:categoryid req.params.categoryid  ' + req.params.categoryid);
//		})


//router.route('/cards/category/:categoryId')
//		.get(function(req, res) {
//			mongodata.cardsByCategory(res, req.params.categoryid);
//			console.log ('/cards/category:categoryid req.params.categoryid  ' + req.params.categoryid);
//		})
// 		.post(function(req, res) {
//
// 		})
// 		.delete(function(req, res) {
//
// 		})
// 		.create(function(req, res) {
//
// 		})

//router.route('/cards/curricula/:curriculaId')
//		.get(function(req, res) {
//			mongodata.cardsByCategory(res, req.params.categoryid);
//			console.log ('/cards/category:categoryid req.params.categoryid  ' + req.params.categoryid);
//		})
// 		.post(function(req, res) {
//
// 		})
// 		.delete(function(req, res) {
//
// 		})
// 		.create(function(req, res) {
//
// 		})

router.route('/cards/card/:cardid')
    .get(function(req, res) {
        mongodata.cardsById(res, req.params.cardid);
        // console.log ('/cards/card:cardid : req.params.cardid  ' + req.params.cardid);
    })
// 		.post(function(req, res) {
//
// 		})
// 		.delete(function(req, res) {
//
// 		})
// 		.create(function(req, res) {
//
// 		})


//router.get('/parsemocks', function(req, res) {
//    mongodata.InitDBMocks(res);
//});