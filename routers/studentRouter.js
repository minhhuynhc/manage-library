const express = require('express')
const route = express.Router()
const studentController = require('../controllers/studentController')
const multer = require('multer')
const upload = multer()
const authen = require('../middlewares/authen')

route.get('/', (req,res) => {
    res.render('studentLogin')
})
route.post('/', upload.none(), studentController.login)

// route.use(authen)
route.get('/studentAction', (req,res) => {
    console.log(req.query,'req.query')
    res.render('studentAction', {name: req.query.name, books: req.query.book, number: req.query.number})
})
route.post('/studentAction', upload.none(), studentController.action)

route.get('/studentReturn', (req, res) => {
    console.log(req.query,'req.query')
    res.render('studentReturn', {name: req.query.name, books: req.query.book, number: req.query.number})
})
route.post('/studentReturn', upload.none(), studentController.return)
route.patch('/studentReturn', upload.none(), studentController.return)

route.get('/studentBorow', (req, res) => {
    res.render('studentBorow', {name: req.query.name, books: req.query.book, number: req.query.number})
})
route.post('/studentBorow', upload.none(), studentController.borow)
route.patch('/studentBorow', upload.none(), studentController.borow)
module.exports = route