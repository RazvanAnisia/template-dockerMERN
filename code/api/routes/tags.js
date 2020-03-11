const express = require('express');
const router = express.Router();
const TagsController = require('../controllers/tags');

router
  .route('/')
  .get(TagsController.getTags)
  .post(TagsController.createTag);

router
  .route('/:id')
  .put(TagsController.updateTag)
  .delete(TagsController.deleteTag);

module.exports = router;
