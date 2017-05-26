'use strict';
var should = require('should')
var request =require('supertest')
var mongoose = require('mongoose');
var configDB = require('../config/database');

describe('data controller and db', function(){
    
    var url;
    before(function(done) {

        // todo start server from here
        url = 'http://127.0.0.1:8888';

        mongoose.connect(configDB.url, function(){
            mongoose.connection.db.dropDatabase();
            done();
        });
    })

    beforeEach(function(done){
        done()
    })

    after(function(done){
        //close dbcon and server
        done()
    })

    describe('curricula data CRUD', function() {

        it('addCurricula to db', function(done) {
            var newcurricula = {
                name: "mocha_curricula",
                admins: "raz kronenberg",
                facess : [{
                    ordernum : 0,
                    symbol : "transcript-dbg",
                    text : "Transcript mocha face",
                    sound : false,
                    previewDisplay : true
                },{
                    ordernum : 1,
                    symbol : "heb-dbg",
                    text : "Hebrew mocha face",
                    sound : false,
                    previewDisplay : true
                },{
                    ordernum : 2,
                    symbol : "eng-dbg",
                    text : "English mocha face",
                    sound : false,
                    previewDisplay : true
                },{
                    ordernum : 3,
                    symbol : "arab-dbg",
                    text : "Arabic mocha face",
                    sound : false,
                    previewDisplay : true
                }]
            };

            request(url)
                .put('/api/curricula')
                .send(newcurricula)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    done();
                });
        });

        it('add Second Curricula to db', function(done) {
            var newcurricula = {
                name: "second mocha Curricula",
                admins: "raz kronenberg",
                facess : [{
                    ordernum : 0,
                    symbol : "transcript-dbg",
                    text : "Transcript second mocha",
                    sound : false,
                    previewDisplay : true
                },{
                    ordernum : 1,
                    symbol : "heb-dbg",
                    text : "Hebrew second mocha",
                    sound : false,
                    previewDisplay : true
                },{
                    ordernum : 2,
                    symbol : "eng-dbg",
                    text : "English second mocha",
                    sound : false,
                    previewDisplay : true
                },{
                    ordernum : 3,
                    symbol : "arab-dbg",
                    text : "Arabic second mocha",
                    sound : false,
                    previewDisplay : true
                }]
            };

            request(url)
                .put('/api/curricula')
                .send(newcurricula)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    done();
                });
        });

        it('get list of Curricula\'s', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.body.length.should.equal(2);
                    done();
                });
        });
    });

    describe('category data CRUD', function() {
        this.timeout(50000);

        it('addCategory to mocha Curricula', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    var curBody = res.body[0];


                    var newcategory = {
                        curricula: curBody._id,
                        symbol: "mocha category",
                        name: 'mocha_category',
                        facess: [{
                            ordernum: 0,
                            symbol: "trans-dbg",
                            text: "mocha trans-face",
                            sound: false,
                            previewDisplay: true
                        },{
                            ordernum: 1,
                            symbol: "heb-dbg",
                            text: "mocha hebface",
                            sound: false,
                            previewDisplay: true
                        },{
                            ordernum: 2,
                            symbol: "eng-dbg",
                            text: "mocha eng-face",
                            sound: false,
                            previewDisplay: true
                        },{
                            ordernum: 3,
                            symbol: "arb-dbg",
                            text: "mocha arb-face",
                            sound: false,
                            previewDisplay: true
                        }]
                    };

                    request(url)
                        .put('/api/category')
                        .send(newcategory)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            done();
                        });
                });
        });


    });

    describe('card data CRUD', function() {

        it('Data preperation addCategory to mocha Curricula', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    var curBody = res.body[0];

                    var newcategory = {
                        curricula: curBody._id,
                        symbol: "mocha category",
                        name: 'mocha_category',
                        facess: [{
                            ordernum: 0,
                            symbol: "trans-dbg",
                            text: "mocha trans-face",
                            sound: false,
                            previewDisplay: true
                        },{
                            ordernum: 1,
                            symbol: "heb-dbg",
                            text: "mocha hebface",
                            sound: false,
                            previewDisplay: true
                        },{
                            ordernum: 2,
                            symbol: "eng-dbg",
                            text: "mocha eng-face",
                            sound: false,
                            previewDisplay: true
                        },{
                            ordernum: 3,
                            symbol: "arb-dbg",
                            text: "mocha arb-face",
                            sound: false,
                            previewDisplay: true
                        }]
                    };

                    request(url)
                        .put('/api/category')
                        .send(newcategory)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            done();
                        });
                });
        });

        it('addCard to mocha category', function(done) { // to refactor with category
            request(url)
                .get('/api/categoriesList')
                .expect(200)
                .end(function (err, res) {
                    var catBody = res.body[0];

                    var newCard1 = {
                        name: "mocha_card_1",
                        category: catBody._id,
                        facess : [{
                            ordernum : 0,
                            symbol : "trans-card",
                            text : "mocha card transcript",
                            sound : false,
                            previewDisplay : true
                        },{
                            ordernum : 1,
                            symbol : "heb-card",
                            text : "mocha card heb",
                            sound : false,
                            previewDisplay : true
                        },{
                            ordernum : 2,
                            symbol : "eng-card",
                            text : "mocha card eng",
                            sound : false,
                            previewDisplay : true
                        },{
                            ordernum : 0,
                            symbol : "arb-card",
                            text : "mocha card arb",
                            sound : false,
                            previewDisplay : true
                        }]
                    };

                    request(url)
                        .put('/api/card')
                        .send(newCard1)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            done();
                        });
                });
        });

        it('addCard to mocha category', function(done) { // to refactor with category
            request(url)
                .get('/api/categoriesList')
                .expect(200)
                .end(function (err, res) {
                    var catBody = res.body[0];

                    var newCard1 = {
                        name: "mocha_card_1",
                        category: catBody._id,
                        facess : [{
                            ordernum : 0,
                            symbol : "trans-card",
                            text : "mocha card transcript",
                            sound : false,
                            previewDisplay : true
                        },{
                            ordernum : 1,
                            symbol : "heb-card",
                            text : "mocha card heb",
                            sound : false,
                            previewDisplay : true
                        },{
                            ordernum : 2,
                            symbol : "eng-card",
                            text : "mocha card eng",
                            sound : false,
                            previewDisplay : true
                        },{
                            ordernum : 0,
                            symbol : "arb-card",
                            text : "mocha card arb",
                            sound : false,
                            previewDisplay : true
                        }]
                    };

                    request(url)
                        .put('/api/card')
                        .send(newCard1)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            done();
                        });
                });
        });
    });
})