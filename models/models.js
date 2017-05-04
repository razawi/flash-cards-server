'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Cards

var curriculaSchema = new Schema({
  name: String,
  admins: String, // users
  facess : [{
    ordernum : Number,
    symbol : String,
    text : String,
    sound : Boolean,
    previewDisplay : Boolean
  }]

});

var categorySchema = new Schema({
  curricula:  [{ type: Schema.Types.ObjectId, ref: 'Curricula' }],
  symbol: String,
  name: String,
  facess : [{
    ordernum : Number,
    symbol : String,
    text : String,
    sound : Boolean,
    previewDisplay : Boolean
  }]
});

var cardSchema = new Schema({
  name: String,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  facess : [{
    ordernum : Number,
    symbol : String, //"subcategory_id.symbol",
		text : String,
		sound : Boolean,
		previewDisplay : Boolean
  }]
});

// Card decks

var Curricula = mongoose.model('Curricula', curriculaSchema);
var Category = mongoose.model('Category', categorySchema);
var Card = mongoose.model('Card', cardSchema);

exports.Curricula = Curricula;
exports.Category = Category;
exports.Card = Card;
