const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');



//Crear el servidor express
const app = express();

// Base de Datos

dbConnection();



//pass: 0000
//user: MEAN_USER

// Configurar CORS
app.use( cors() );


//Lectura y parseo del body
app.use(express.json());



//Rutas
app.use( '/api/usuarios', require('./ROUTES/usuarios'));
app.use( '/api/hospitales', require('./ROUTES/hospitales'));
app.use( '/api/medicos', require('./ROUTES/medico'));
app.use( '/api/login', require('./ROUTES/auth'));
app.use( '/api/todo', require('./ROUTES/busquedas'));
app.use( '/api/upload', require('./ROUTES/uploads'));



app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto ' + 3000)
});