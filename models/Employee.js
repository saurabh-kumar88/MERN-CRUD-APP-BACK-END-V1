const mongoose      = require('mongoose');
var autoIncrement   = require('simple-mongoose-autoincrement');

const employeeSchema = new mongoose.Schema({
    employee_Id     : {type : Number, default : 0},
    name            : {type : String, },
    designation     : {type : String, },
    phone           : {type : String, },
}, {timestamps : true});

employeeSchema.plugin(autoIncrement, {field :  'employee_Id'});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;


  
  

  
