const express       = require('express');
const mongoose      = require('mongoose');
/** Middlewares */
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cors          = require('cors');

const EmployeeRoute = require('./routers/employee');
const BooksRoute    = require('./routers/books');
const TodoRoute     = require('./routers/todo');

require('dotenv/config');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

  try {
    mongoose.connect(
      process.env.ATLAS_URI,
      { useNewUrlParser : true , useUnifiedTopology : true},
      () => {console.log('----- connected with DB -----')}   
    );
  } catch (error) {
    console.log('----- unable to connect with DB ----')
  }

const db = mongoose.connection

db.on('error' ,  (err) => {
    console.log(err);
});

db.once('open', ()=>{
    console.log('Database Connection Established!');
});

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
});

// parent routes
app.use('/api/books', BooksRoute);
app.use('/api/employee', EmployeeRoute);
app.use('/api/todo', TodoRoute);

/** ---------- test end-point ------------------- */

app.get('/api/home/', async (req, res) => {
	
    try {
      res.json({ message : 'Hello world..!!'})
    } catch (error) {
      res.json({ message : error })
    }
});



