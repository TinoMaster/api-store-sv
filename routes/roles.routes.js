const express = require('express');
const router = express.Router();
const rolesServices = require('../services/roles.service');

router.get('/roles', rolesServices.getRoles);
router.post('/roles/create', rolesServices.createRoles);
router.put('/roles/:id', rolesServices.updateOne);
router.delete('/roles/:id', rolesServices.deleteRoles);

module.exports = router;
