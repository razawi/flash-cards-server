const express = require('express');
const url = require('url');
const co = require('co');
const util = require('util');
const configDB = require('../config/database');

const mongodata = require('../controllers/dataController');
const router = module.exports = express.Router();
var jwt = require('jsonwebtoken');

var user = {
  username: 'raz',
  password: 'raz'
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


router.post('/login', authenticate, function (req, res) {
    var token = jwt.sign({
        username: user.username
    }, configDB.jwtSecret);
    res.send({
        token: token,
        user: user
    });
});

// var faker = require('faker');
// router.get('/random-user', function (req, res) {
//     var user = faker.Helpers.userCard();
//     user.avatar = faker.Image.avatar();
//     res.json(user);
// });

router.get('/me', function (req, res) {
    res.send(req.user);
});



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
        mongodata.updateCard(req.body, res);
    })
    .delete(function(req, res) {
        mongodata.deleteCard(req.body, res);
	})
    .get(function(req, res) {
        if (req.query.id){
            mongodata.getCardById(req.query.id, res);
        }
        else if (req.query.category){
            mongodata.getCardByCategoryId(req.query.category, res);
        }
        // mongodata.getCard(req.body, res);
    });

    router.route('/card/:id')
        .get(function(req, res) {
            mongodata.getCardById(req.params.id, res);
        })
        .delete(function(req, res) {
            mongodata.deleteCard(req.params.id, res);
        })

router.route('/category')
    .put(function(req, res) {
        mongodata.addCategory(req.body, res);
    })
    .post(function(req, res) {
         mongodata.updateCategory(req.body, res);
    })
    .delete(function(req, res) {
        mongodata.deleteCategory(req.body, res);
    })
    .get(function(req, res) {
        if (req.query.id){
            mongodata.cardsByCategoryId(req.query.id, res);
        }
        else if(req.query.name){
            mongodata.catByCategoryName(req.query.name, res);
        }
        else if (req.query.cur_id){
            mongodata.getCategoriesByCurriculaId(req.query.cur_id, res);
        }
        // else error
    }); 

router.route('/category/:id')
    .get(function(req, res) {
        mongodata.getCategoryById(req.params.id, res);
    })
    .delete(function(req, res) {
        mongodata.deleteCategory(req.params.id, res);
    })


router.route('/curricula')
    .put(function(req, res) {
        mongodata.addCurricula(req.body, res);
    })
    .post(function(req, res) {
         mongodata.updateCurricula(req.body, res);
        // res.send(200);
    })
    .get(function(req, res) {
        if (req.query.id){
            mongodata.getCategoriesByCurriculaId(req.query.id, res);
        }
    });

router.route('/curricula/:id')
    .get(function(req, res) {
        mongodata.getCurriculaById(req.params.id, res);
    })
    .delete(function(req, res) {
        mongodata.deleteCurricula(req.params.id, res);
    })



router.get('/curriculaList', function(req, res) {
    mongodata.curriculasList(res);
});

router.get('/categoriesList', function(req, res) {
    mongodata.categoriesList(res);
});

router.get('/cardsList', function(req, res) { 
    mongodata.cardsList(res);
});

