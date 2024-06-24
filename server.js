const express = require('express')
require('dotenv').config(); //usamos la librería de dotenv y para que lea el fichero de variables de entorno, necesitamos estos métodos
const mongoose = require('mongoose');
const cowsay = require('cowsay')
const app = express()
const port = 3000

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

// Rutas
const productsApiRoutes = require("./routes/products.routes")
const providersApiRoutes = require("./routes/providers.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

// Conectar a MongoDB Atlas
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');

  // Iniciar el servidor solo si la conexión a MongoDB es exitosa
  app.listen(port, () => {
    console.log(
      cowsay.say({
        text: `Funcionando en: http://localhost:${port}`,
        e: "oO",
        T: "U ",
      })
    );
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Rutas
//API
app.use('/api',productsApiRoutes);
app.use('/api',providersApiRoutes);


// Para rutas no existentes
app.use('*',error404);

/*app.listen(port, () => {
  console.log(
      cowsay.say({
          text: `Funcionando en: http://localhost:${port}`,
          e: "oO",
          T: "U "
      }))
});*/