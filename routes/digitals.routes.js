const express = require('express');
const router = express.Router();
const DigitalService = require('../services/digitals.service');

const validatorHandler = require('../middlewares/validator.handler');
const { createDigitalSchema } = require('../schemas/digitals.schema');

router.get('/digitals', DigitalService.find);
router.get('/digitals/:id', DigitalService.findOne);
router.post(
  '/digitals',
  validatorHandler(createDigitalSchema, 'body'),
  DigitalService.create
);
router.patch('/digitals/:id', DigitalService.updatePatch);
router.delete('/digitals/:id', DigitalService.deleteProduct);

module.exports = router;
