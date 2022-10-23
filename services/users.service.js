const UsersServices = () => {};
const userConnection = require('../models/users.model');
const boom = require('@hapi/boom');

const hashPassword = require('../helpers/password.hash');

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

module.exports = UsersServices;
