const { number } = require('joi');
const mongoose  = require('mongoose');
var autoincrement = require('simple-mongoose-autoincrement');

const pageSchema = mongoose.Schema({

  page_Id      : {type : Number, default : 0},
  title        : {type : String, required : true},
  description  : {type : String, default : "Loren Ipsum....."},

});

pageSchema.plugin(autoincrement, {field : 'page_Id'});

const Page   = mongoose.model('Page', pageSchema);
module.exports = Page;





