'use strict';

var models = require('../models/models');
var mongoose = require('mongoose');
var fs = require ("fs");
var curricula = models.Curricula;
var category = models.Subcategory;
var card = models.Card;
var face = {};


// make new card
function addCard(body, res){
	res.send(200, 'dataController Mock')
}


// delete card byId
function deleteCard(body, res){
	res.send(200, 'dataController Mock')
}

function getCard (body, res){
	res.send(200, 'dataController Mock')
}

// make new category
function addCategory(body, res){
	res.send(200, 'dataController Mock')
}

// delete category (only empty) byId
function deleteCategory(body, res){
	res.send(200, 'dataController Mock')
}


function getCategory (body, res){
	res.send(200, 'dataController Mock')
}

// make new curricula
function addCurricula(body, res){

	res.send(200, 'dataController Mock')
}

// delete curricula (only empty) byId
function deleteCurricula(body, res){
	res.send(200, 'dataController Mock')
}

function getCurricula (body, res){
	res.send(200, 'dataController Mock')
}


// get cards by curriculas
function curriculasList(res){

	curricula.find({}, function(err, curics){
		if (err) {res.json(error)}
		else{
			res.json(curics);
		}
	})
}

// get cards by Subcategory

// get all categorys
function categorysList(res){

	category.find({}, function(err, categ){
		if (err) {res.json(err)}
		else{
			res.json( categ);
		}
	})
}

// get all cards
function cardsList(res){

	card.find({}, function(err, car){
		if (err) {res.json(err)}
		else{
			res.json( car);
		}
	})
}

// find card id by name

// get card by id
function cardsById(res, id){
	var oid = mongoose.Types.ObjectId(id)

	card.find({"_id": oid }, function(err, car){
		if (err) {res.json(err)}
		else{
			res.json( car);
		}
	})
}

// find category id by name

// get cards by category id	???
function cardsByCategory(res, id){
	var oid = mongoose.Types.ObjectId(id);

	card.find({"subcategory._id": oid }, function(err, car){
		if (err) {res.json(err)}
		else{
			res.json( car);
		}
	})
}

// get categorys by curicula
function categorysByCurricula(res, id){

	var oid = mongoose.Types.ObjectId(id)
	category.find({"curricula._id": oid}, function(err, car){
		if (err) {res.json(err)}
		else{
			res.json( car);
		}
	})
}


// flash cards
exports.curriculasList = curriculasList;
exports.categorysList = categorysList;

exports.categorysList = categorysList;
exports.categorysByCurricula = categorysByCurricula;

exports.cardsList = cardsList;
exports.cardsByCategory = cardsByCategory;
exports.cardsById = cardsById;


exports.addCard = addCard;
exports.deleteCard = deleteCard;
exports.getCard = getCard;

exports.addCategory = addCategory;
exports.deleteCategory = deleteCategory;
exports.getCategory = getCategory

exports.addCurricula = addCurricula;
exports.deleteCurricula = deleteCurricula;
exports.getCurricula = getCurricula;
//exports.InitDBMocks = InitDBMocks;
//
//
//function InitDBMocks(res) {
//
//	InitCardsDb();
//	res.json("Initing DB");
//}
//
//function InitCardsDb() {
//
//	var prettyjson = require('prettyjson');
//	var jsondb = "";
//
//	// console.log("InitJSONDB");
//	var dbsource =fs.readFileSync('res/carddb.json', "utf-8");
//	jsondb = JSON.parse(dbsource.toString('utf8'));
//
//	var curricula = models.Curricula;
//	var category = models.Subcategory;
//	var card = models.Card;
//	var face = {};
//
//	var categorys = [];
//	var curriculas = [];
//	var TBDFace = [{
//		ordernum : 0,
//		symbol  : 'TBD',
//		text : 'TBD',
//		sound  : false,
//		previewDisplay : false
//	}];
//
//	function mapObjects(obj) {
//		var objects = [];
//		for (var i in obj) {
//			if (!obj.hasOwnProperty(i)) continue;
//
//			if(i == 'type' && obj[i] == "Curriculum"){
//				var arabic = new curricula({
//					name : obj['text'],
//					admins : 'raz',
//					facess : TBDFace
//				});
//
//				curriculas.push(arabic);
//
//				arabic.save(function(err) {
//					if (err) throw err;
//
//					//console.log('Curriculum created!');
//				});
//			}
//
//			if(i == 'type' && obj[i] == "Lesson"){
//				var lesson = new category({
//					symbol : obj['text'],
//					curricula : curriculas[0],
//					facess : TBDFace
//				})
//
//				lesson.save(function(err) {
//					if (err) throw err;
//
//					//console.log('Lesson created!');
//				});
//
//				categorys.push(lesson);
//			}
//
//			if(i == 'type' && obj[i] == "word"){
//
//				var facess = [];
//				var face1 = {}, face2 = {}, face3  = {};
//
//				face1.ordernum = obj["heb"]["ordernum"];
//				face1.symbol = obj["heb"]["symbol"];
//				face1.text = obj["heb"]["text"];
//				face1.sound = false;
//				face1.previewDisplay = obj["heb"]["previewDisplay"];
//
//				face2.ordernum = obj["eng"]["ordernum"];
//				face2.symbol = obj["eng"]["symbol"];
//				face2.text = obj["eng"]["text"];
//				face2.sound = false;
//				face2.previewDisplay = obj["eng"]["previewDisplay"];
//
//				facess.push(face2);
//
//				face3.ordernum = obj["arb"]["ordernum"];
//				face3.symbol = obj["arb"]["symbol"];
//				face3.text = obj["arb"]["text"];
//				face3.sound = false;
//				face3.previewDisplay = obj["arb"]["previewDisplay"];
//
//				facess.push(face3);
//				facess.push(face1);
//
//				var word = new card({
//					subcategory : categorys[categorys.length -1],
//					name : obj["heb"]["text"], //symbol
//					facess : facess
//				});
//
//				word.save(function(err) {
//					if (err) throw err;
//
//					// console.log('word created!');
//				});
//			}
//
//			if (typeof obj[i] == 'object') {
//				mapObjects(obj[i]);
//			}
//		}
//	}
//
//	mapObjects(jsondb);
//}

