const express = require('express');
const router = express.Router();
const DigitalService = require('../services/digitals.service');

/* const { checkApiKey } = require('../middlewares/auth.handlers'); */

router.get('/digitals', DigitalService.find);
router.get('/digitals/:id', DigitalService.findOne);
router.post(
  '/digitals',

  DigitalService.create
);
router.patch('/digitals/:id', DigitalService.updatePatch);
router.delete('/digitals/:id', DigitalService.deleteProduct);

module.exports = router;
