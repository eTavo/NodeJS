const express = require('express');
const router = express.Router();

const Registros = require('../models/registro');

const bcrypt = require('bcryptjs')

const Joi = require('@hapi/joi');

const schemaLoggin = Joi.object({
    usuario: Joi.string().min(4).max(24).required(),
    password: Joi.string().min(6).max(100).required()
})

router.get('/', (req, res) => {
    res.render("loggin")
})

router.post('/', async (req, res) => {
    //validacion de loggin
    
    const {error} = schemaLoggin.validate(req.body)
    if (error) return res.status(400).json({error: error.details[0].message}) 
    
    const user = await Registros.findOne({usuario: req.body.usuario})
    if (!user) return res.status(400).json({error: true, mensaje: 'Usuario no encontrado'});

    const passValida = await bcrypt.compare(req.body.password, user.password)
    if (!passValida) return res.status(400).json({error: true, mensaje: 'Contraseña incorrecta'});
    res.redirect('/home')
    
})

module.exports = router;