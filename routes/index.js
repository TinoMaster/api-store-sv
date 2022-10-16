const express = require('express');
const productRoutes = require('./products.routes');
const usersRoutes = require('./users.routes');

/* Funcion para agregar las rutas */
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use(productRoutes);
  router.use(usersRoutes);
}

module.exports = routerApi;
