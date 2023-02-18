const Joi = require('joi');

const email = Joi.string().email().lowercase();
const password = Joi.string().min(8);
const token = Joi.string();

const recoveryEmail = Joi.object({
  email: email.required()
})

const recoveryPassword = Joi.object({
  newPassword: password.required(),
  token: token.required()
})

module.exports = { recoveryEmail, recoveryPassword }
