const Employee = require('../models/Employee');

// show the list of Employees

const index = (req, res, next) => {
    Employee.find({})
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.json({
            message : 'An error Occured!'
        })
    })
}

// show single employee

const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response =>{
        res.json({
            response
        })
        .catch(error => {
            res.json({
                message : 'An error Occured!'
            })
        })
    })
};


// add new employee

const store = (req, res, next) => {
    let employee_obj = new Employee({
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age,
    })
    employee_obj.save()
    .then(response => {
        res.json({
            message : 'Employee Added Successfuly!'
        })
        .catch(error => {
            res.json({
                message : 'An error Occured while saving to DB!'
            })
        })
    })
};


// update an employee
const update  = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age,
    }

    Employee.findIdAndUpdate(employeeID, {$set : updatedData})
    .then(()=>{
        res.json({
            message : "Employee record updated successfully!"
        })
    })
    .catch(error =>{
        res.json({
            message : "An error occured while record updation!"
        })
    })

};

// delete an emloyee record

const deleteEmployee = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(()=>{
        res.json({
            message : "Record deleted!"
        })
    })
    .catch(error =>{
        res.json({
            message : "An Error occiured while record deletion!"
        })
    })
};

module.exports = {
    index,
    show,
    store,
    update,
    deleteEmployee,
};



















