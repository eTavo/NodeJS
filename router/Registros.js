/*  FUNCIONA SIN VALIDACION

const express = require('express');
const router = express.Router();

const Registros = require('../models/registro');

router.get('/', async (req,res) => {

    try{

        const arrayRegistrosDB = await Registros.find()
        console.log(arrayRegistrosDB)

        res.render('registro', {

            arrayRegistro : arrayRegistrosDB
        })

    }catch (error){
        console.log(error)
    }
})

router.get('/registro', (req, res) => {
    res.render('registro')
})

router.post('/', async(req, res) => {
    const body = req.body
    try {
        // espera que se cree el documento en mongodb
        await Registros.create(body)
        // redirecciona la carga a la vista home
        res.redirect('/')

    } catch (error) {
        console.log(body)
    }
})



module.exports = router;

*/

const express = require('express');
const router = express.Router();

const Registros = require('../models/registro');

const bcrypt = require('bcryptjs')

const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    nombre: Joi.string().min(4).max(24).required(),
    apellido: Joi.string().min(4).max(24).required(),
    usuario: Joi.string().min(4).max(24).required(),
    email: Joi.string().min(6).max(54).required().email(),
    password: Joi.string().min(6).max(100).required()
})

router.get('/', async (req,res) => {

    try{

        const arrayRegistrosDB = await Registros.find()
        console.log(arrayRegistrosDB)

        res.render('registro', {

            arrayRegistro : arrayRegistrosDB
        })

    }catch (error){
        console.log(error)
    }
})

router.get('/registro', (req, res) => {
    res.render('registro')
})

router.post('/', async (req, res) => {
    
    const {error} = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message}) 
    }
    
    const existeEmail = await Registros.findOne({email: req.body.email}) 
    if(existeEmail) return res.status(400).json({error: true, message: 'email ya registrado'})

    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos) 

    const user = new Registros({
        usuario: req.body.usuario,
        email: req.body.email,
        password: password,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    })

    try {
        const userDB = await user.save();
        res.redirect('/')

    }catch (error) { 
        res.status(400).json(error)
    }

})

module.exports = router;