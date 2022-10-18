const express = require('express');
const router = express.Router();
const DigitalService = require('../services/digitals.service');

router.get('/digitals', DigitalService.find);
router.post('/digitals', DigitalService.create);
router.patch('/digitals/:id', DigitalService.updatePatch);
router.delete('/digitals/:id', DigitalService.deleteProduct);

module.exports = router;
