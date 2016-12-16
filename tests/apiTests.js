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
        //dbFlush ?
        done()
    })

    after(function(done){
        //close dbcon and server
        done()
    })

    describe('Sanity tests', function() {

        it('should return pong', function(done){
            request(url)
                .get('/api/ping')
                .end(function (err, res) {
                    res.text.should.eql('pong');
                    done();
                });
        });

        it('health check via co should work', function (done) {
            request(url)
                .get('/api/health')
                .end(function (err, res) {
                    res.text.should.eql('helth chack');
                    done();
                });
        });

    });

    describe('adding data', function() {

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

        // get list of curricula's



        it('addCategory to mocha Curricula', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    var curBody = res.body[0];
                    curBody.name.should.equal('mocha_curricula');

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

        it('getCategory by name', function(done) {
            var name

            request(url)
                .get('/api/category')
                .send({name : 'mocha_category'})
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;
                    // open mongo and check db
                    body[0].name.should.equal('mocha_category');
                    body[0].symbol.should.equal('mocha category');
                    done();
                });
        });



        it.skip('getCategory by id', function(done) {

        });

        it('getCategories by curricula id', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                   var curBody = res.body[0];
                   curBody.name.should.equal('mocha_curricula');
                   request(url)
                        .get('/api/category')
                        .send({curricula : curBody._id})
                        .expect(200)
                        .end(function (err, res) {
                            var body = res.body;
                            // open mongo and check db
                            body[0].name.should.equal('mocha_category');
                            body[0].symbol.should.equal('mocha category');
                            done();
                        });
               })
        })

        it('addCard to mocha category', function(done) { // to refactor with category

            request(url)
                .get('/api/categoriesList')
                .expect(200)
                .end(function (err, res) {
                    var catBody = res.body[0];
                    catBody.name.should.equal('mocha_category');

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

        it('get cards by category', function(done) {
            request(url)
                .get('/api/categoriesList')
                .expect(200)
                .end(function (err, res) {
                    var catBody = res.body[0];
                    catBody.name.should.equal('mocha_category');
                    request(url)
                        .get('/api/card')
                        .send({category: catBody._id})
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            res.body[0].name.should.equal('mocha_card_1');
                            done();
                        });
                });
        });

        // get card by Id

        it.skip('empty test stub getCard', function(done) {
            request(url)
                .get('/api/card')
                .expect(200)
                .end(function (err, res) {
                    // res.text.should.eql('helth chack');
                    done();
                });
        });
    });


    describe.skip('editing and deleting data', function() {
        it('empty test stub delete card')

        it('empty test stub delete category with content')

        it('empty test stub dont delete category with content')

        it('empty test delete empty Curricula')

        it('empty test stub delete Curricula with content')

        it('empty test stub dont delete Curricula with content')

        it('empty test delete empty category')
    });

    describe.skip('card stash tests', function() {

    });

    it.skip('empty test stub', function(done) {
        request(url)
            .get('/api/')
            .end(function (err, res) {
                // res.text.should.eql('helth chack');
                done();
            });
    });

})