const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todos');

router
  .route('/')
  .get(TodosController.getTodos)
  .post(TodosController.createTodo);

router
  .route('/:id')
  .get(TodosController.showTodo)
  .put(TodosController.updateTodo)
  .delete(TodosController.deleteTodo);

module.exports = router;
