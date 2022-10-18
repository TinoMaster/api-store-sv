const DigitalService = () => {};
const DigitalConecction = require('../models/digital.model');
const boom = require('@hapi/boom');
const { faker } = require('@faker-js/faker');

DigitalService.find = (req, res, next) => {
  DigitalConecction.find().exec((err, docs) => {
    try {
      if (err) {
        throw boom.notFound('Not Found');
      } else {
        res.json(docs);
      }
    } catch (error) {
      next(error);
    }
  });
};
DigitalService.findSome = (req, res) => {
  let products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      product: faker.commerce.product(),
      image: faker.image.imageUrl(),
    });
  }

  res.json(products);
};
DigitalService.create = (req, res) => {
  const data = req.body;
  data.image = faker.image.imageUrl();
  DigitalConecction.create(data, (err) => {
    if (err) {
      throw boom.internal('No hay conexion con la base de datos');
    } else {
      res.json({
        message: 'Se ah insertado correctamente',
        data: data,
      });
    }
  });
};
DigitalService.updatePatch = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Se ah actualizado el producto correctamente',
    data: body,
    id,
  });
};
DigitalService.deleteProduct = (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Se ah Borrado el producto correctamente',
    id,
  });
};

module.exports = DigitalService;
