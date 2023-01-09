const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

require('dotenv').config();

/* if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} */

const {
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handlers');

const app = express();
const PORT = process.env.PORT || 5000;

require('./helpers/strategies');

/* Este middleware se usa para poder recibir archivos json */
app.use(express.json());
app.use(cors());

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});
