const Joi = require('joi');
const { createUserSchema } = require('./users.schema');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const phone = Joi.string();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone,
  user: createUserSchema.required(),
})

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
})

const getCustomerSchema = Joi.object({
  customerId: id.required(),
})

const queryCustomerSchema = Joi.object({
  limit,
  offset
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema, queryCustomerSchema }
