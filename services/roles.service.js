const rolesServices = () => {};
const rolesConnection = require('../models/roles.model');

const boom = require('@hapi/boom');

rolesServices.getRoles = (req, res, next) => {
  rolesConnection.find().exec((err, docs) => {
    try {
      if (err) {
        next(boom.clientTimeout('No se han podido obtener los datos'));
      } else {
        res.json(docs);
      }
    } catch (error) {
      next(boom.clientTimeout(error));
    }
  });
};
rolesServices.createRoles = (req, res, next) => {
  const newRole = req.body;
  rolesConnection.create(newRole, (err) => {
    try {
      if (err) {
        next(boom.clientTimeout('No se han podido obtener los datos'));
      } else {
        res.json({
          success: true,
          message: 'Usuario insertado correctamente',
          role: newRole.name,
        });
      }
    } catch (error) {
      next(boom.clientTimeout(error));
    }
  });
};

module.exports = rolesServices;
