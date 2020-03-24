const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todos');

router.route('/').post(TodosController.createTodo);

router
  .route('/:id')
  .get(TodosController.showTodo)
  .put(TodosController.updateTodo)
  .delete(TodosController.deleteTodo);

router.route('/complete/:id').put(TodosController.completeTodo);

module.exports = router;
