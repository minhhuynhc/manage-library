const express = require('express')
const route = express.Router()
const welcomeController = require('../controllers/welcomeControler')
const multer = require('multer')
const upload = multer()

route.get('/', (req,res) => {
    res.render('welcomeView')
})
route.post('/', upload.none(), welcomeController.action)

module.exports = route