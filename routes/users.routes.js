const express = require('express');
const router = express.Router();
const UserServices = require('../services/users.service');

const { createUserSchema, loginUserSchema } = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');

router.get('/users', UserServices.getUsers);
router.get('/users/:id', UserServices.getUserById);
/* Registro de usuario */
router.post(
  '/users/register',
  validatorHandler(createUserSchema, 'body'),
  UserServices.createUser
);
/* Login de usuario */
router.post(
  '/users/login',
  validatorHandler(loginUserSchema, 'body'),
  UserServices.loginUser
);

module.exports = router;
