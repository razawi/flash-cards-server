'use strict';

var models = require('../models/models');
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require ("fs");
var curricula = models.Curricula;
var category = models.Category;
var card = models.Card;
var face = {};

// make new card
function addCard(body, res){
	card.create(body, function (err, cur) {
		if (err)
			res.status(400).send('card not added');
		else
			res.status(200).send('card added');
	})
}

// delete card byId
function deleteCard(id, res){
	card.remove({ _id: id }, function(err) {
			if (err) 
				res.send(400, 'category not deleted');
			else
				res.status(200).send('category deleted');
	});
}

function getCardById (id, res){
	try{
		// var oid = mongoose.Types.ObjectId(id)

		card.find({"_id": id }, function(err, car){
			if (err) res.status(400).send(err);
			else{
				res.status(200).send(car);
			}
		})
	} catch(x){
		res.status(400).send('no body or _id');
	}
}

function updateCard(body, res) {
	card.update({_id: body._id}, {
			category: body.category,
			facess: body.facess,
			name: body.name
		}, function(err, numAffected) {
			if (err) 
				res.send(400, 'Curricula not edited');
			else
				res.status(200).send('Curricula edited');
	});
}

// deprecate
function getCard (body, res){
	if (body.category) {
		card.find({"category": body.category }, function(err, car){
			if (err) {res.json(err)}
			else{
				res.json( car);
			}
		})
	}
	else if (body.name) {
		card.find({"name": body.name }, function(err, car){
			if (err) {res.json(err)}
			else{
				res.json( car);
			}
		})
	}
	else
		res.send(400, 'no body or _id');
}

// make new category
function addCategory(body, res){

	//var cat = _.omit(body, 'curricula');
	//cat.curricula = mongoose.Types.ObjectId(body.curricula);

	category.create(body, function (err, cur) {
		if (err)
			res.send(400, 'Category not added');
		else
			res.status(200).send('Category added');
	})
}

function getCategoryById(id, res) {
	try{
		// var oid = mongoose.Types.ObjectId(id)
		category.find({"_id": id }, function(err, car){
			if (err) res.status(400).send(err);
			else{
				res.status(200).send(car);
			}
		})
	} catch(x){
		res.status(400).send('mongo db category exception');
	}
}

function updateCategory(body, res) {
	category.update({_id: body._id}, {
			curricula: body.curricula,
			facess: body.facess,
			name: body.name,
			symbol: body.symbol
		}, function(err, numAffected) {
			if (err) 
				res.send(400, 'category not edited');
			else
				res.status(200).send('category updated');
	});
}

// delete category (only empty) byId
function deleteCategory(id, res){
	category.remove({ _id: id }, function(err) {
			if (err) 
				res.send(400, 'category not deleted');
			else
				res.status(200).send('category deleted');
	});
}

function getCategory (body, res){
	if (body._id){
		var oid = mongoose.Types.ObjectId(body._id)

		category.find({"_id": body._id }, function(err, car){
			if (err) {res.json(err)}
			else{
				res.json( car);
			}
		})
	}
	else if (body.curricula){
		category.find({"curricula": body.curricula }, function(err, car){
			if (err) {res.json(err)}
			else{
				res.json( car);
			}
		})
	}
	// else if (body.name){
	// 	category.find({"name": body.name }, function(err, car){
	// 		if (err) {res.json(err)}
	// 		else{
	// 			res.json( car);
	// 		}
	// 	})
	// }
	else
		res.send(400, 'no body or _id');
}

// make new curricula
function addCurricula(body, res){
	curricula.create(body, function (err, cur) {
		if (err)
			res.send(400, 'Curricula not added');
		else
			res.status(200).send('Curricula added');
	})
}

function getCurriculaById(id, res){
	try{
		//todo - get the categories with curricula Id
		curricula.find({}, function(err, curic){
			if (err)
				res.send(400, 'Curricula not found');
			else
				res.status(200).send(curic);
		})
	} catch(x){
		res.status(400).send('mongo db curricula exception');
	}
}

function updateCurricula(body, res) {
	curricula.update({_id: body._id}, {
			admins: body.admins,
			facess: body.facess,
			name: body.name
		}, function(err, numAffected) {
			if (err) 
				res.send(400, 'Curricula not edited');
			else
				res.status(200).send('Curricula edited');
	});
}

// delete curricula (only empty) byId
function deleteCurricula(id, res){
	curricula.remove({ _id: id }, function(err) {
			if (err) 
				res.send(400, 'Curricula not deleted');
			else
				res.status(200).send('Curricula deleted');
	});
}


function getCategoriesByCurriculaId(id, res){
	try{
		//todo - get the categories with curricula Id
		category.find({}, function(err, categ){
			if (err) {res.json(err)}
			else{
				res.json(categ);
			}
		})
	} catch(x){
		res.status(400).send('no body or _id');
	}
}

// to deprecate
function getCurricula (body, res){
	if (body.name){
		curricula.find({"name": body.name }, function(err, car){
			if (err) {res.json(err)}
			else{
				res.json( car);
			}
		})
	}
	else
		res.send(400, 'no name and id')
}


function curriculasList(res){

	curricula.find(function(err, curics){
			if (err) {res.json(error)}
			else{
				curics = curics.map(function (curics) {
					return curics.toObject();
				});
				res.json(curics);
			}
	});
}


// get all categorys
function categoriesList(res){
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
function cardsByCategoryId(id, res){
	var oid = mongoose.Types.ObjectId(id);

	try{
		card.find({"subcategory._id": oid }, function(err, car){
			if (err) { res.send(400, 'category not found');}
			else{
				res.status(200).send(car);
			}
		})
	} catch(x){}
}

function catByCategoryName(name, res){
	try{
		category.find({"name": name }, function(err, car){
			if (err) { res.send(400, 'category not found');}
			else{
				res.status(200).send(car);
				//res.send(200,  car);
			}
		})
	} catch(x){}
}

// get categorys by curicula
function categoriesByCurricula(res, id){

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
exports.categoriesList = categoriesList;

exports.categoriesList = categoriesList;
exports.categoriesByCurricula = categoriesByCurricula;

exports.cardsList = cardsList;
exports.cardsByCategoryId = cardsByCategoryId;
exports.cardsById = cardsById;


exports.addCard = addCard;
exports.deleteCard = deleteCard;
exports.getCard = getCard; // todo - reduce and remove
exports.getCardById = getCardById;
exports.catByCategoryName = catByCategoryName;
exports.updateCard = updateCard;

exports.addCategory = addCategory;
exports.deleteCategory = deleteCategory;
exports.getCategory = getCategory
exports.updateCategory = updateCategory;
exports.getCategoryById = getCategoryById

exports.updateCurricula = updateCurricula;
exports.addCurricula = addCurricula;
exports.deleteCurricula = deleteCurricula;
exports.getCurriculaById = getCurriculaById;

// exports.getCurricula = getCurricula;
// exports.getCategoriesByCurriculaId = getCategoriesByCurriculaId;
