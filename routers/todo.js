const express       = require('express');
const router        = express.Router()

const TodoController    = require('../controllers/TodoController');

router.get('/', TodoController.Index);
router.get('/show/:Id', TodoController.Show);
router.get('/latest/', TodoController.Latest)
router.post('/add', TodoController.Add);
router.patch('/update/:Id', TodoController.Update);
router.delete('/delete/:Id', TodoController.Delete);
router.delete('/delete-all/', TodoController.DeleteAll);

module.exports = router; 