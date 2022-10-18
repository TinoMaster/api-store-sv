const joi = require('joi');

const title = joi.string().min(3);
const description = joi.string();
const price = joi.number().min(1);
const discount = joi.number();
const edition = joi.string().min(3);
const category = joi.string().min(3);
/* const editions = joi.array();
const image = joi.string(); */

const createDigitalSchema = joi.object({
  title: title.required(),
  description: description.required(),
  price: price.required(),
  edition: edition.required(),
  category: category.required(),
  discount: discount,
});

module.exports = { createDigitalSchema };
