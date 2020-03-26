const express = require('express');
const router = express.Router();
const TodoListController = require('../controllers/TodoListsController');

router
  .route('/')
  .get(TodoListController.getTodoLists)
  .post(TodoListController.createTodoList);

router
  .route('/:id')
  .put(TodoListController.updateTodoList)
  .delete(TodoListController.deleteTodoList);

module.exports = router;
