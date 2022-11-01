const express = require('express')
const route = express.Router()
const librarianController = require('../controllers/librarianController')
const multer = require('multer')
const upload = multer()

route.get('/', (req,res) => {
    res.render('librarianView', {ID: req.query.ID})
})
route.post('/', upload.none(), librarianController.action)

route.get('/login', (req,res) => {
    res.render('librarianLogin')
})
route.post('/login', upload.none(), librarianController.login)


route.get('/createBook', (req,res) => {
    console.log(req.query.libraries,'heeeeedsdsdseee')
    res.render('createBook', {ID: req.query.ID, libraries: req.query.libraries})
})
route.post('/createBook', upload.none(), librarianController.createBook)

route.get('/createStudent', (req,res) => {
    res.render('createStudent')
})
route.post('/createStudent', upload.none(), librarianController.createStudent)

// route.get('/readbook', (req,res) => {
//     res.render('readbook')
// })
// // // route.post('/readbook', upload.none(), librarianController.readbook)

// route.get('/updatebook', (req,res) => {
//     res.render('updatebook')
// })
// // // route.post('/updatebook', upload.none(), librarianController.updatebook)

// route.get('/deletebook', (req,res) => {
//     res.render('deletebook')
// })
// // route.post('/deletebook', upload.none(), librarianController.delebook)

route.get('/success', (req,res) => {
    res.render('success')
})
module.exports=route