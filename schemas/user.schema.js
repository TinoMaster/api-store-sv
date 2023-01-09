const joi = require('joi');

const name = joi.string().min(2);
const phone = joi.string();
const role = joi.string().min(3);
const active = joi.number().max(1);
const address = joi.object({
  calle: joi.string(),
  entre: joi.string(),
  numero: joi.string(),
  municipio: joi.string(),
});
const userRegister = joi.object({
  email: joi.string().min(8),
  password: joi.string().min(5),
});
const userLogin = joi.object({
  email: joi.string(),
  password: joi.string(),
});

const createUserSchema = joi.object({
  name: name.required(),
  phone: phone,
  role: role,
  address: address,
  active: active.required(),
  user: userRegister.required(),
});

const loginUserSchema = joi.object({
  user: userLogin.required(),
});

module.exports = { createUserSchema, loginUserSchema };
