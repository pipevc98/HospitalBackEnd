const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {


    try {
        mongoose.set("strictQuery", false);

        mongoose.connect(process.env.DBConnnection, {
            UseUnifiedTopology: true
        });

        console.log('Db online');
        
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de iniciar db');
    }


}

module.exports = {
    dbConnection
}