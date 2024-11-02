const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactoSchema = new Schema({
    nombre: String,
    contacto: String, 
    motivo: String,
    entidad: String,
    descripcion: String
});

// crear modelo
const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;