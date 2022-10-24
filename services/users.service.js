const UsersServices = () => {};
const userConnection = require('../models/users.model');
const boom = require('@hapi/boom');

const hashPassword = require('../helpers/password.hash');
const verifyPassword = require('../helpers/password.verify');

const signToken = require('../helpers/token-sign');

UsersServices.getUsers = (req, res) => {
  userConnection.find().exec((err, docs) => {
    if (err) {
      throw boom.notFound('Products not found');
    } else {
      res.json({
        message: 'Peticion aceptada',
        data: docs,
      });
    }
  });
};
UsersServices.getUserById = async (req, res, next) => {
  const { id } = req.params;

  userConnection.find({ _id: id }).exec((err, docs) => {
    try {
      if (err) {
        throw boom.notFound('Product not found');
      } else {
        res.json({
          message: 'success',
          data: docs,
        });
      }
    } catch (error) {
      next(error);
    }
  });
};
/* Funcion de registrar usuarios */
UsersServices.createUser = async (req, res, next) => {
  const data = await req.body;
  const hashPass = await hashPassword(data.user.password);
  const newUser = {
    ...data.user,
    password: hashPass,
  };
  const newData = {
    ...data,
    user: newUser,
  };

  if (Object.entries(data).length > 0) {
    userConnection.create(newData, (err) => {
      try {
        if (err) {
          throw err;
        } else {
          res.json({
            message: 'Datos recibidos correctamente',
            success: true,
          });
        }
      } catch (error) {
        error.code === 11000
          ? next(boom.notAcceptable('El correo ya existe'))
          : next(boom.notAcceptable(error));
      }
    });
  } else {
    res.json({
      message: 'No de han enviado datos, por favor verificar',
    });
  }
};
/* Funcion para login de usuarios */
UsersServices.loginUser = async (req, res, next) => {
  const data = req.body;

  userConnection
    .findOne({ 'user.email': data.user.email })
    .exec(async (err, docs) => {
      try {
        if (err) {
          next(boom.badData('Credenciales incorrectas'));
        } else {
          const isPassword = await verifyPassword(
            data.user.password,
            docs.user.password
          );
          if (isPassword) {
            const payload = {
              sub: docs._id,
              role: docs.role,
            };
            const token = await signToken(payload, process.env.JWT_KEY);
            res.json({
              success: true,
              name: docs.name,
              role: docs.role,
              token,
            });
          } else next(boom.badData('Contraseña incorrecta'));
        }
      } catch (error) {
        next(boom.badData('Usuario incorrecto'));
      }
    });
};

module.exports = UsersServices;
