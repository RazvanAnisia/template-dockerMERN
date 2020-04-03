const Joi = require('@hapi/joi');

const todoListSchemas = {
  create: Joi.object().keys({
    name: Joi.string()
      .required()
      .max(25)
  }),
  update: Joi.object().keys({
    name: Joi.string()
      .required()
      .max(25)
  })
};

module.exports = todoListSchemas;
