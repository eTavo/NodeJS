const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota');

router.get('/', async (req,res) => {

    try{

        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

        res.render('mascotas', {

            arrayMascotas : arrayMascotasDB

            //arrayMascotas: [
            //    {id: 1, nombre: 'Perro', descripcion: 'Henry'},
            //    {id: 2, nombre: 'Hamster', descripcion: 'Sin nombre'},
            //]
        })

    }catch (error){
        console.log(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

// agrega datos a la base y los muestra en enlace
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
        await Mascota.create(body)
        // redirecciona la carga a la vista de mascotas
        res.redirect('/mascotas')

    } catch (error) {
        console.log(body)
    }
})

router.get('/:id', async (req,res) => {
    
    const id = req.params.id

    try {
        
        const mascotaDB = await Mascota.findOne({_id: id})
        console.log(mascotaDB)

        res.render('detalle', {
            mascota : mascotaDB,
            error: false
        })
    } catch (error) {

        console.log(error)

        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})

router.delete('/:id', async (req,res) => {
    
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})

        if (mascotaDB) {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'fallo eliminar!'
            })
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;