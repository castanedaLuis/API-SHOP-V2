const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  boomErrorHandler,
  logErrors,
  errorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3006;

//Middleware para mostrar el body
app.use(express.json());

//lista blanca para permitir el acceso a dominios
const whitelist = ['http://localhost:3006','http://localhost:3030' ,'https://myapp.co', 'https://api-express-shop.up.railway.app/'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true); //le digo que no hay error y le damos permiso
    } else {
      callback(new Error('no permitido'));
    }
  },
};
//app.use(cors(options));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    "author":"José Luis Castañeda Osornio",
    "Description":"Api en versión V1, en cual actualmente recibe peticiones (GET, POST, PUT, PATCH, DELETE, el cual se refieren a endPoints de Productos)",
  });
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('http://localhost:' + port);
});
