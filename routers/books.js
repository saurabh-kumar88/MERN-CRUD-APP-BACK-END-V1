const express       = require('express');
const router        = express.Router()

const BooksController    = require('../controllers/BooksController');

router.get('/', BooksController.Index);
router.get('/show/:Id', BooksController.Show);
router.post('/add', BooksController.Add);
router.patch('/update/:Id', BooksController.Update);
router.delete('/delete/:Id', BooksController.Delete);

module.exports = router; 