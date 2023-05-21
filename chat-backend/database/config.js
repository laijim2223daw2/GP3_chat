const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        //Metodo para conectar
        mongoose.connect(process.env.DB_CNN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB Online');
    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}