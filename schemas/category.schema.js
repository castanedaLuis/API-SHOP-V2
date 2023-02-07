const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(20).max(120);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  description:description,
  image: image
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }