'use strict';

var should = require('should')
var request =require('supertest')
// var data = require('../controllers/dataController')
var mongoose = require('mongoose');
var configDB = require('../config/database');

describe('data controller and db', function(){
    
    var db, url;
    before(function(done) {

        console.log('before');
        url = 'http://127.0.0.1:8888';

        done()
    })

    beforeEach(function(done){
        // dbflush
        done()
    })

    after(function(done){
        //close dbcon and server
        done()
    })

    it('should return pong', function(done){
        request(url)
            .get('/api/ping')
            .end(function (err, res) {
                res.text.should.eql('pong');
                done();
            });
    })

    it('health check via co should work', function(done) {
        request(url)
            .get('/api/health')
            .end(function (err, res) {
                res.text.should.eql('helth chack');
                done();
            });
    })

    it('addCurricula to db', function(done) {
        var postData = {
            name: "mocha debug",
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
            .post('/api/curricula')
            .send(postData)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                done();
            });
    });

    it('addCategory to db', function(done) {
        var postData = {
            name: "mocha debug",
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
            .post('/api/category')
            .send(postData)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                done();
            });
    });

    it('addCard to db', function(done) {
        var postData = {
            name: "mocha debug",
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
            .post('/api/card')
            .send(postData)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err)
                done();
            });
    });

    it('empty test stub', function(done) {
        request(url)
            .get('/api/')
            .end(function (err, res) {
                // res.text.should.eql('helth chack');
                done();
            });
    });

    it('empty test stub', function(done) {
        request(url)
            .get('/api/')
            .end(function (err, res) {
                // res.text.should.eql('helth chack');
                done();
            });
    });

    it('empty test stub', function(done) {
        request(url)
            .get('/api/')
            .end(function (err, res) {
                // res.text.should.eql('helth chack');
                done();
            });
    });

    it('empty test stub', function(done) {
        request(url)
            .get('/api/')
            .end(function (err, res) {
                // res.text.should.eql('helth chack');
                done();
            });
    });



})