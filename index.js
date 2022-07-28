require('dotenv').config();

const express = require('express');
var cors = require('cors')


const {dbConnection} = require('./DB/config')

//Crear el servidor de express
const app = express();

//Configuración del cors
app.use(cors());

//Base de Datos
dbConnection();

// Rutas
app.get('/' , (req, res) => {

    res.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    });
})

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT)
})