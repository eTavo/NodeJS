const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    res.render("home")
})

router.get('/programs', (req, res) => {
    res.render("programs")
})

router.get('/calculadora', (req, res) => {
    res.render("calculadora")
})

module.exports = router;