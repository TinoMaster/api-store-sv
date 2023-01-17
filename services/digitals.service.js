const DigitalService = () => {};
const DigitalConecction = require('../models/digital.model');

DigitalService.find = (req, res) => {
  DigitalConecction.find().exec((err, docs) => {
    try {
      if (err) {
        throw err;
      } else {
        res.json(docs);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
DigitalService.findOne = (req, res) => {
  const { id } = req.params;

  DigitalConecction.findById({ _id: id }).exec((err, doc) => {
    res.json(doc);
  });
};
DigitalService.create = (req, res) => {
  const data = req.body;

  DigitalConecction.create(data, (err) => {
    if (err) {
      throw err;
    } else {
      res.json({
        message: 'Se ah insertado correctamente',
        data: data,
      });
    }
  });
};
DigitalService.updatePatch = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Se ah actualizado el producto correctamente',
    data: body,
    id,
  });
};
DigitalService.deleteProduct = (req, res) => {
  const { id } = req.params;
  try {
    DigitalConecction.findByIdAndDelete({ _id: id }).exec((err, doc) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal error' });
      } else {
        doc !== null
          ? res.json({ success: true, message: 'Product Deleted' })
          : res.json({ error: true, message: 'Product non-existed' });
      }
    });
  } catch (error) {
    /*  console.log(error); */
    res.status(500).json({ error: true, message: 'internal error' });
  }
};

module.exports = DigitalService;
