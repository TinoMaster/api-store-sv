const UsersServices = () => {};
const userConnection = require('../models/users.model');
const boom = require('@hapi/boom');

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
UsersServices.getUserById = async (req, res,next) => {
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
UsersServices.createUser = async (req, res) => {
  const data = await req.body;

  if (Object.entries(data).length > 0) {
    userConnection.create(data, (err) => {
      if (err) {
        throw err;
      } else {
        res.json({
          message: 'Datos recibidos correctamente',
          success: true,
        });
      }
    });
  } else {
    res.json({
      message: 'No de han enviado datos, por favor verificar',
    });
  }
};

module.exports = UsersServices;
