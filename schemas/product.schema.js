const Joi = require('joi');

const id = Joi.number().integer();
//const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(20);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const name = Joi.string().min(3).max(15).messages({
    'string.base': `" nombre "debe ser un tipo de 'texto'`,
    'string.empty': `"nombre "no puede ser un campo vacío`,
    'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
    'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
  });

  const price_min = Joi.number().integer();
  const price_max = Joi.number().integer();

  const limit = Joi.number().integer();
  const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description:description.required(),
  image: image.required(),
  categoryId:categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description:description,
  image:image,
  categoryId:categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }