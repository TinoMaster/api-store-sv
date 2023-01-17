const rolesServices = () => {};
const rolesConnection = require('../models/roles.model');

rolesServices.getRoles = (req, res) => {
  rolesConnection.find().exec((err, docs) => {
    try {
      if (err) {
        throw err;
      } else {
        res.json(docs);
      }
    } catch (error) {
      console.log(error);
      res.json({ error: true, message: 'Internal error' });
    }
  });
};
rolesServices.createRoles = (req, res) => {
  const newRole = req.body;
  rolesConnection.create(newRole, (err) => {
    try {
      if (err) {
        throw err;
      } else {
        res.json({
          success: true,
          message: 'Usuario insertado correctamente',
          role: newRole.name,
        });
      }
    } catch (error) {
      console.log(error);
      error.errors.name.kind === 'required'
        ? res.status(404).json({ error: true, type: 'required', message: '' })
        : res
            .status(500)
            .json({ error: true, type: 'unknown', message: 'Internal Error' });
    }
  });
};
rolesServices.deleteRoles = (req, res) => {
  const { id } = req.params;
  try {
    rolesConnection.deleteOne({ _id: id }).exec((err) => {
      if (err) {
        throw err;
      } else res.json({ success: true, message: 'role deleted' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal error' });
  }
};
rolesServices.updateOne = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    rolesConnection.findByIdAndUpdate({ _id: id }, data).exec((err, doc) => {
      if (err) {
        throw err;
      } else {
        console.log(doc);
        res.json({ success: true, message: 'role updated' });
      }
    });
  } catch (error) {
    res.json({ error: true, message: 'Internal error' });
  }
};

module.exports = rolesServices;
