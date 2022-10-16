const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');

router.get('/products', ProductsService.find);
router.post('/products', ProductsService.create);
router.patch('/products/:id', ProductsService.updatePatch);
router.delete('/products/:id', ProductsService.deleteProduct);

module.exports = router;
