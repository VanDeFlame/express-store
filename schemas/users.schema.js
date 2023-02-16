const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role
})

const updateUserSchema = Joi.object({
  email,
  password,
  role
})

const getUserSchema = Joi.object({
  userId: id.required(),
})

const queryUserSchema = Joi.object({
  limit,
  offset
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema, queryUserSchema }
