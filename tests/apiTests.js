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

        it('edit Curricula', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    var cur = res.body[0];
                    cur.admins = "raz";
                    cur.facess[0].text = "edited Transcript mocha face";
                    request(url)
                        .post('/api/curricula')
                        .send(cur)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            request(url)
                                .get('/api/curricula/' + cur._id)
                                .expect(200)
                                .end(function (err, res) {
                                    should.not.exist(err)
                                    res.body[0].admins.should.equal('raz');
                                    res.body[0].facess[0].text.should.equal("edited Transcript mocha face");
                                    done();
                                })
                        });
                });
        });

        it('delete Curricula', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    var cur = res.body[0];
                    request(url)
                        .delete('/api/curricula/' +cur._id)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            request(url)
                                .get('/api/curriculaList')
                                .expect(200)
                                .end(function (err, res) {
                                    should.not.exist(err)
                                    res.body.length.should.equal(1);
                                    done();
                                });
                        });
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
                    curBody.name.should.equal('second mocha Curricula');


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

        it('getCategory by id', function(done) {
            request(url)
                .get('/api/categoriesList')
                .expect(200)
                .end(function (err, res) {
                    var cat = res.body[0];
                    request(url)
                        .get('/api/category/' + cat._id)
                        .expect(200)
                        .end(function (err, res) {
                            var idcateg = res.body[0]
                            idcateg._id.should.equal(cat._id);
                            done();
                        });
                });
        });

        it('edit category', function(done) {
            request(url)
                .get('/api/categoriesList')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    var cat = res.body[0];
                    cat.name = "edited mocha_category"
                    cat.facess[0].text = "edited mocha trans-face";
                    request(url)
                        .post('/api/category')
                        .send(cat)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            request(url)
                                .get('/api/category/' + cat._id)
                                .expect(200)
                                .end(function (err, res) {
                                    should.not.exist(err)
                                    res.body[0].name.should.equal('edited mocha_category');
                                    res.body[0].facess[0].text.should.equal("edited mocha trans-face");
                                    done();
                                })
                        });
                });
        });

        it('delete Curricula', function(done) {
            request(url)
                .get('/api/categoriesList')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    var cat = res.body[0];
                    request(url)
                        .delete('/api/category/' +cat._id)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            request(url)
                                .get('/api/categoriesList')
                                .expect(200)
                                .end(function (err, res) {
                                    should.not.exist(err)
                                    res.body.length.should.equal(0);
                                    done();
                                });
                        });
                });
        });

        // fail
        it.skip('getCategory by name and curic_id', function(done) {
            var name

            request(url)
                .get('/api/category?name=mocha_category')
                .send()
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;
                    // open mongo and check db
                    body[0].name.should.equal('mocha_category');
                    body[0].symbol.should.equal('mocha category');
                    done();
                });
        });

        // fail
        it.skip('list Categories by curricula id', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                   var curBody = res.body[0];
                   console.log(curBody.name +' == mocha_curricula' + JSON.stringify(curBody));
                   curBody.name.should.equal('mocha_curricula');

                   request(url)
                        .get('/api/category/cur_id='+ curBody._id)
                        .send()
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

    });

    describe('card data CRUD', function() {

        it('Data preperation addCategory to mocha Curricula', function(done) {
            request(url)
                .get('/api/curriculaList')
                .expect(200)
                .end(function (err, res) {
                    var curBody = res.body[0];
                    curBody.name.should.equal('second mocha Curricula');

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

        it('get Cards by id', function(done) {
            request(url)
                .get('/api/cardsList')
                .expect(200)
                .end(function (err, res) {
                    var cat = res.body[0];
                    request(url)
                        .get('/api/card/' + cat._id)
                        .expect(200)
                        .end(function (err, res) {
                            var idcateg = res.body[0];
                            idcateg._id.should.equal(cat._id);
                            done();
                        });
                });
        });

        it('edit Card', function(done) {
            request(url)
                .get('/api/cardsList')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    var card = res.body[0];
                    card.name = "edited_mocha_card_1"
                    card.facess[0].text = "edited mocha card transcript";
                    request(url)
                        .post('/api/card')
                        .send(card)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            request(url)
                                .get('/api/card/' + card._id)
                                .expect(200)
                                .end(function (err, res) {
                                    should.not.exist(err)
                                    res.body[0].name.should.equal('edited_mocha_card_1');
                                    res.body[0].facess[0].text.should.equal("edited mocha card transcript");
                                    done();
                                })
                        });
                });
        });

        it('delete card', function(done) {
            request(url)
                .get('/api/cardsList')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err)
                    var card = res.body[0];
                    request(url)
                        .delete('/api/card/' + card._id)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err)
                            request(url)
                                .get('/api/cardsList')
                                .expect(200)
                                .end(function (err, res) {
                                    should.not.exist(err)
                                    res.body.length.should.equal(0);
                                    done();
                                });
                        });
                });
        });


        // get card by name and category id

        // fail
        // it.skip('get cards by category', function(done) {
        //     request(url)
        //         .get('/api/categoriesList')
        //         .expect(200)
        //         .end(function (err, res) {
        //             var catBody = res.body[0];
        //             catBody.name.should.equal('mocha_category');
        //             request(url)
        //                 .get('/api/card')
        //                 .send({category: catBody._id})
        //                 .expect(200)
        //                 .end(function (err, res) {
        //                     should.not.exist(err)
        //                     res.body[0].name.should.equal('mocha_card_1');
        //                     done();
        //                 });
        //         });
        // });

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
    });


    describe.skip('card stash tests', function() {

        it.skip('empty test stub', function(done) {
            request(url)
                .get('/api/')
                .end(function (err, res) {
                    // res.text.should.eql('helth chack');
                    done();
                });
        });
    });

    describe.skip('Autabtication tests', function() {

        // admin permissions vs user
    });



})