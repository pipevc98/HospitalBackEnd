// Importacion de Mongoose
const mongoose = require('mongoose');

//Funcion encargada de establecer la conexión
const dbConnection = async () => {
        
    try {
        
        await mongoose.connect(process.env.DB);
        console.log('DB online');
        
    } catch (error) {
        console.log(error);
        
        throw new Error('Failed to connect to server');
    }
    
}

module.exports = {
    dbConnection
}