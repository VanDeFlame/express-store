const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
})

const updateCategorySchema = Joi.object({
  name,
  image
})

const getCategorySchema = Joi.object({
  categoryId: id.required(),
})

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
