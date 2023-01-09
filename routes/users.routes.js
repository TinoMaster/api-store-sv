const express = require('express');
const router = express.Router();
const UserServices = require('../services/users.service');

const { createUserSchema } = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');

router.get('/users', UserServices.getUsers);
router.get('/users/:id', UserServices.getUserById);
/* Registro de usuario */
router.post(
  '/users/register',
  validatorHandler(createUserSchema, 'body'),
  UserServices.registerUser
);
/* Login de usuario */
router.post(
  '/users/login',
  passport.authenticate('local', { session: false }),
  UserServices.loginUser
);

module.exports = router;
