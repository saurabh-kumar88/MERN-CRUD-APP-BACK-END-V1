const Book      = require('../models/Book');
const Joi       = require('joi');

// show the list of Books
const Index = async (req, res, next) => {  
    // try {
    //   const books = await Book.find({}).sort('-publication')
    //   res.json(books);
    // } catch (error) {
    //   res.json({ message : error })
    // }
    try {
      res.json('foo bar');
    } catch {
      res.json({ message : error})
    }
  
}

// show by id
const Show = async (req, res) => {
  try {
    const book = await Book.find({ 'book_Id' : req.params.Id });
    if(book.length == 0) return res.status(404).send({message : 'No such record found!'}); 
    res.json(book);
  } catch (error) {
    res.json({ message : error })
  }
  
};


// add 
const Add = async (req, res) => {
  
  const { error } = validateInputData(req.body);
  if(error) return res.status(400).send({message : error.details[0].message});
  
    // If no error, save it to DB
    const book = new Book({
      title       : req.body.title,
      author      : req.body.author,
      publication : req.body.publication,
      genera      : req.body.genera,
    });

    try {
      const savedBook = await book.save();
      res.json(savedBook)
    } catch (error) {
      res.json({ message : error })
    }
};

// update
const Update = async (req, res) => {
  
  try {
    const updateBook = await Book.updateOne({'book_Id' : req.params.Id }, 
    {$set : {
      title : req.body.title,
      author : req.body.author,
      publiction : req.body.publication
    } 
  });
    
  res.json(updateBook);  
  } catch (error) {
    res.json({ message : error });
  }  

};

// delete
const Delete = async (req, res) => {
  try {
      
    const removedBook = await Book.remove({ 'book_Id' : req.params.Id });
    res.json(removedBook);
  } catch (error) {
    res.json({ message : error })
  }
};


function findBook(bookId){
  
  Book.find(bookId)
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
    author      : Joi.string().max(20).required(),
    publication : Joi.string(),
    genera      : Joi.string(),


	};
	return Joi.validate(inputData, schema);
};



module.exports = {
    Index,
    Show,
    Add,
    Update,
    Delete
}

