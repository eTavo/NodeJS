const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registroSchema = new Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    password: String,
    email: String  
});

// crear modelo
const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro;