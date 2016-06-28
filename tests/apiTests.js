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
})