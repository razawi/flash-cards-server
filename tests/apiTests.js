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

    describe.skip('Sanity tests', function() {

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
                name: "mocha_debug",
                admins: "raz kronenberg",
                facess : [{
                    ordernum : 0,
                    symbol : "dbg",
                    text : "mocha face",
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

        // by name and id
        it.skip('empty test getCurriculaList', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    // res.text.should.eql('helth chack');
                    var body = res.body[0];
                    body.name.should.equal('mocha_debug');
                    done();
                });
        });

        it('addCategory to mocha Curricula', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    var curBody = res.body[0];
                    curBody.name.should.equal('mocha_debug');

                    var newcategory = {
                        curricula: curBody._id,
                        symbol: "DBG Category",
                        name: 'mocha_category',
                        facess: [{
                            ordernum: 0,
                            symbol: "dbg",
                            text: "mocha face",
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

        // by name and id
        it.skip('empty test getCategory', function(done) {
            request(url)
                .get('/api/category')
                .expect(200)
                .end(function (err, res) {
                    // open mongo and check db

                    done();
                });
        });

        it('addCard to mocha category', function(done) {
            var newCard1 = {
                name: "DBG Card 1",
                facess : [{
                    ordernum : 0,
                    symbol : "mocha",
                    text : "mocha",
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

        // by name and id
        it('empty test stub getCard', function(done) {
            request(url)
                .get('/api/card')
                .expect(200)
                .end(function (err, res) {
                    // res.text.should.eql('helth chack');
                    done();
                });
        });

    });

    describe.skip('getting aggregated data', function() {

    })
    describe.skip('editing and deleting data', function() {
        it('empty test stub delete card')

        it('empty test stub delete category with content')

        it('empty test stub dont delete category with content')

        it('empty test delete empty Curricula')

        it('empty test stub delete Curricula with content')

        it('empty test stub dont delete Curricula with content')

        it('empty test delete empty category')
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