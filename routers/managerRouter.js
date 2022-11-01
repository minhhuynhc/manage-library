const express = require('express')
const route = express.Router()
const managerController = require('../controllers/managerController')
const multer = require('multer')
const upload = multer()

route.get('/login', (req, res) => {
    res.render('managerLogin')
})
route.post('/login', upload.none(), managerController.login)

route.get('/', (req,res) => {
    res.render('managerView')
})
route.post('/', upload.none(), managerController.action)

route.get('/createLibrary', (req,res) => {
    res.render('createLibrary')
})
route.post('/createLibrary', upload.none(), managerController.createLibrary)

route.get('/createLibrarian', (req,res) => {
    res.render('createLibrarian')
})
route.post('/createLibrarian', upload.none(), managerController.createLibrarian)

route.get('/success', (req,res) => {
    res.render('success')
})


route.get('/listLibrary', upload.none(), managerController.listLibrary)
route.delete('/deleteLibrary', upload.none(), managerController.deleteLibrary)
route.get('/detailLibrary', upload.none(), managerController.detailLibrary)
route.get('/listLibrarian', upload.none(), managerController.listLibrarian)
route.post('/success', upload.none(), managerController.recreate)
module.exports=route