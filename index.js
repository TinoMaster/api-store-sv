const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = process.env.port || 5000;

/* Este middleware se usa para poder recibir archivos json */
app.use(express.json());

routerApi(app);

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto ' + port);
});
