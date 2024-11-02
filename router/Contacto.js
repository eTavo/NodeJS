const express = require('express');
const router = express.Router();

const Contacto = require('../models/contacto');

router.get('/', async (req,res) => {

    try {

        const arrayContactosDB = await Contacto.find();
        console.log(arrayContactosDB)

        res.render('contact', {

            arrayContactos: arrayContactosDB

        })

    } catch (error) {
        console.log(error)
    }

})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.post('/', async(req, res) => {
    const body = req.body
    try {
        //------  metodo 1 ---------

        // crea modelo de Mascota
        //const mascotaDB = new Mascota(body)
        // guarda en la base de dato
        //await mascotaDB.save()

        //------  metodo 2 ---------
        // espera que se cree el documento en mongodb
        await Contacto.create(body)
        // redirecciona la carga a la vista de mascotas
        res.redirect('/contact')

    } catch (error) {
        console.log(body)
    }
})

module.exports = router;