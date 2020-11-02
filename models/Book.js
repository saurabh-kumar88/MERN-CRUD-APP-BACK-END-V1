const mongoose        = require('mongoose');
var autoIncrement     = require('simple-mongoose-autoincrement');

const BookSchema = new mongoose.Schema({
     
    book_Id      : { type : Number, default : 0},
    title        : { type : String, required : true, maxlength : 50, },
    author       : { type : String, required : true, maxlength : 20, },
    publication  : { type : Date, default : Date.now },
    genera       : { type : String, default : ''},
      
  });

BookSchema.plugin(autoIncrement , {field : 'book_Id'});
const Book = mongoose.model('Book', BookSchema);
module.exports = Book;