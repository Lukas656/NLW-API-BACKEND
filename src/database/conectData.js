const mongoose = require('mongoose');

mongoose
    .set('strictQuery', true)
    .connect('mongodb://localhost:27017/Trips', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // 5 segundos
    })
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });

module.exports = mongoose; 
