const express = require('express');
const router = express.Router();
const UserServices = require('../services/users.service');

router.get('/users', UserServices.getUsers);
router.get('/users/:id', UserServices.getUserById);
router.post('/users/register', UserServices.createUser);
/* router.patch('/login/:id', async (req, res) => {
  const data = await req.body;
  const { id } = req.params;

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
}); */

module.exports = router;
