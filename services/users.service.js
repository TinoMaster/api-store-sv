const UsersServices = () => {};
const userConnection = require('../models/users.model');
const boom = require('@hapi/boom');

const hashPassword = require('../helpers/password.hash');

const signToken = require('../helpers/token-sign');

UsersServices.getUsers = (req, res) => {
  userConnection.find().exec((err, docs) => {
    if (err) {
      throw boom.notFound('Products not found');
    } else {
      res.json({
        success: true,
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
UsersServices.registerUser = async (req, res, next) => {
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
  try {
    const user = await req.user;

    const payload = {
      sub: user._id,
      role: user.role,
    };

    const token = await signToken(payload, process.env.JWT_KEY);

    res.json({
      success: true,
      name: user.name,
      role: user.role,
      token,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
    next(error);
  }
};

module.exports = UsersServices;
