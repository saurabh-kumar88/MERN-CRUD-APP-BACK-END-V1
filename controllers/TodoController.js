const Todo      = require('../models/Todo');
const Joi       = require('joi');

// show the list of Todos
const Index = async (req, res, next) => {  
    try {
      const todo = await Todo.find({}).sort('-publication')
      res.json(todo);
    } catch (error) {
      res.json({ message : error })
    }
  
}

// get newest record
const Latest = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({}, {}, {sort : {"publication" : -1}})
    res.json(todo);
  } catch (error) {
    res.json({ message : error })
  }
}

// show by id
const Show = async (req, res) => {
  try {
    const todo = await Todo.find({ 'todo_Id' : req.params.Id });
    if(todo.length == 0) return res.status(404).send({message : 'No such record found!'}); 
    res.json(todo);
  } catch (error) {
    res.json({ message : error })
  }
  
};


// add 
const Add = async (req, res) => {
  
  const { error } = validateInputData(req.body);
  if(error) return res.status(400).send({message : error.details[0].message});
  
    // If no error, save it to DB
    const todo = new Todo({
      title       : req.body.title,
      publication : req.body.publication,
    });

    try {
      const savedTodo = await todo.save();
      res.json(savedTodo)
    } catch (error) {
      res.json({ message : error })
    }
};

// update
const Update = async (req, res) => {
  
  try {
    const updateTodo = await Todo.updateOne({'todo_Id' : req.params.Id }, 
    {$set : {
      title : req.body.title,
      publiction : req.body.publication
    } 
  });
    
  res.json(updateTodo);  
  } catch (error) {
    res.json({ message : error });
  }  

};

// delete
const Delete = async (req, res) => {
  try {     
    const removedTodo = await Todo.deleteOne({ 'todo_Id' : req.params.Id });
    res.json(removedTodo);
  } catch (error) {
    res.json({ message : error }) 
  }
};

const DeleteAll = async (req, res) => {
  try {     
    const removedAllTodo = await Todo.deleteMany({}, );
    res.json(removedAllTodo);
  } catch (error) {
    res.json({ message : error })
  }
};


function findTodo(TodoId){
  
  Todo.find(TodoId)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    })
};


function validateInputData(inputData){
	const schema = {
    title       : Joi.string().max(50).required(),
    publication : Joi.string(),
	};
	return Joi.validate(inputData, schema);
};



module.exports = {
    Index,
    Show,
    Latest,
    Add,
    Update,
    Delete,
    DeleteAll,
}

