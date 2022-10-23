const joi = require('joi');

const name = joi.string().min(2);
const phone = joi.string();
const role = joi.string().min(3);
const address = joi.object({
  calle: joi.string(),
  entre: joi.string(),
  numero: joi.string(),
  municipio: joi.string(),
});
const user = joi.object({
  email: joi.string().min(8),
  password: joi.string().min(5),
});

const createUserSchema = joi.object({
  name: name.required(),
  phone: phone,
  role: role,
  address: address,
  user: user.required(),
});

module.exports = { createUserSchema };
