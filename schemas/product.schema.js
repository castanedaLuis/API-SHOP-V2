const Joi = require('joi');

const id = Joi.string().uuid();
//const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const name = Joi.string().min(3).max(15).messages({
    'string.base': `" nombre "debe ser un tipo de 'texto'`,
    'string.empty': `"nombre "no puede ser un campo vacío`,
    'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
    'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
  });

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image:image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }