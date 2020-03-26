const Tag = require('../models/Tag');

exports.getTags = (req, res) => {
  const { user } = req;
  user
    .getTags()
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.createTag = (req, res) => {
  const { name, color } = req.body;
  const { user } = req;
  user
    .createTag({ name, color })
    .then(() => res.status(200).json({ message: 'successfully added tag' }))
    .catch(err => {
      res.status(500).send({ message: err });
      console.log(err);
    });
};

exports.updateTag = (req, res) => {
  const { name, color } = req.body;
  Tag.update({ name, color }, { where: { id: req.params.id } })
    .then(results => {
      results[0]
        ? res.send({ message: 'Tag successfully updated' })
        : res.send({ message: 'Tag not found' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};

exports.deleteTag = (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(results => {
      results
        ? res.send({ message: 'Tag successfully deleted' })
        : res.status(500).send({ mesage: 'Tag not found' });
    })
    .catch(err => {
      res.status(500).send({ mesage: err });
      console.log(err);
    });
};
