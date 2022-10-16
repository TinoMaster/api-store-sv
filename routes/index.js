const express = require('express');
const productRoutes = require('./products.routes');

/* Funcion para agregar las rutas */
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use(productRoutes);
}

module.exports = routerApi;
