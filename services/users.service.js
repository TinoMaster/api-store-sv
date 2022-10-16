const UsersServices = () => {};
const userConnection = require('../models/users.model');

UsersServices.getUsers = (req, res) => {
  userConnection.find().exec((err, docs) => {
    if (err) {
      throw err;
    } else {
      res.json({
        message: 'Peticion aceptada',
        data: docs,
      });
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
          data,
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
