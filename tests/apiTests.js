var should = require('should')
var supertest =require('supertest')
// var data = require('../controllers/dataController')
var mongoose = require('mongoose');
var configDB = require('../config/database');

describe('data controller and db', function(){
    before(function(done) {
        mongoose.connect(configDB.url);
        done()
    })

    beforeEach(function(done){
        done()
    })

    after(function(done){
        done()
    })

    it('should create ne curricula', function(done){
        this.timeout(4000)

        done()
    })
})