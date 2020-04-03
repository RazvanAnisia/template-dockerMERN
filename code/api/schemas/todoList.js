const Joi = require('@hapi/joi');

const todoListSchemas = {
  create: Joi.object().keys({
    name: Joi.string()
      .required()
      .max(6)
  }),
  update: Joi.object().keys({
    title: Joi.string()
      .required()
      .max(6)
  })
};

module.exports = todoListSchemas;
