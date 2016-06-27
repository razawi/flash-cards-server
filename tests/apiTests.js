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

        request(url)
          .get('/api/health')
          .end(function (err, res) {
            res.text.should.eql('helth chack');
            done();
        });
    })

    beforeEach(function(done){
        // dbflush
        done()
    })

    after(function(done){
        //close dbcon and server
        done()
    })

    it('should create ne curricula', function(done){
        this.timeout(4000)

        done()
    })
})