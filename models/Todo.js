const mongoose        = require('mongoose');
var autoIncrement     = require('simple-mongoose-autoincrement');

const TodoSchema = new mongoose.Schema({
     
    todo_Id      : { type : Number, default : 0},
    title        : { type : String, required : true, maxlength : 50, },
    publication  : { type : Date, default : Date.now },
  });

TodoSchema.plugin(autoIncrement , {field : 'todo_Id'});
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;