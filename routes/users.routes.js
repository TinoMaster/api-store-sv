const express = require('express');
const router = express.Router();
const UserServices = require('../services/users.service');

const passport = require('passport');

router.get('/users', UserServices.getUsers);
router.get('/users/:id', UserServices.getUserById);
/* Registro de usuario */
router.post('/users/register', UserServices.registerUser);
/* Login de usuario */
router.post(
  '/users/login',
  passport.authenticate('local', { session: false }),
  UserServices.loginUser
);

module.exports = router;
