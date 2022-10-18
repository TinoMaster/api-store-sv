const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handlers');

const app = express();
const port = process.env.port || 5000;

/* Este middleware se usa para poder recibir archivos json */
app.use(express.json());
app.use(cors());

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto ' + port);
});
