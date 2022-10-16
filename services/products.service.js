const ProductsService = () => {};
const { faker } = require('@faker-js/faker');

ProductsService.find = (req, res) => {
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
ProductsService.create = (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'Archivo insertado correctamente',
    data: body,
  });
};
ProductsService.updatePatch = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Se ah actualizado el producto correctamente',
    data: body,
    id,
  });
};
ProductsService.deleteProduct = (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Se ah Borrado el producto correctamente',
    id,
  });
};

module.exports = ProductsService;
