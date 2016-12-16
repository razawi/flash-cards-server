const express = require('express');
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
    .put(function(req, res) {
        mongodata.addCard(req.body, res);
	})
    .post(function(req, res) {
        res.send(200);
    })
    .delete(function(req, res) {
        mongodata.deleteCard(req.body, res);
	})
    .get(function(req, res) {
        mongodata.getCard(req.body, res);
    });

router.route('/category')
    .put(function(req, res) {
        mongodata.addCategory(req.body, res);
    })
    .post(function(req, res) {
        res.send(200);
    })
    .delete(function(req, res) {
        mongodata.deleteCategory(req.body, res);
    })
    .get(function(req, res) {
        mongodata.getCategory(req.body, res);
    });

router.route('/curricula')
    .put(function(req, res) {
        mongodata.addCurricula(req.body, res);
    })
    .post(function(req, res) {
        res.send(200);
    })
    .delete(function(req, res) {
        mongodata.deleteCurricula(req.body, res);
    })
    .get(function(req, res) {
        mongodata.getCurricula(req.body, res);
    });



router.get('/curriculaList', function(req, res) {
    mongodata.curriculasList(res);
});

router.get('/categoriesList', function(req, res) {
    mongodata.categoriesList(res);
});

router.get('/cardsList', function(req, res) { 
    mongodata.cardsList(res);
});

router.get('/initArabdb', function(req, res) {
    mongodata.initArabdb(res)
})

