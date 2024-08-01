const Joi = require('joi');

const id = Joi.string().uuid()
const firstName = Joi.string()
const lastName = Joi.string()
const email = Joi.string().email()

const createUserSchema = Joi.object({
  name: firstName.required(),
  name: lastName.required(),
  email: email.required()
})

const updateUserSchema = Joi.object({
  name: firstName,
  name: lastName,
  email: email
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema}
