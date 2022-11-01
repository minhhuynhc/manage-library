const express = require('express')
const app = express()
const PORT = 5000

const mongoose = require('mongoose')
const DB_URL = 'mongodb://CongMinh:123456@127.0.0.1:27017/CaseStudy'
const db=mongoose.connection
mongoose.connect(DB_URL, {useNewUrlParser: true}).then( ()=> {
 console.log('DB connected')
})
db.on('error', (err) => {
    console.log("DB connection error: "+err.message)
})

app.set('view engine', 'ejs')
app.set('views', './views')


const welcomeRouter = require('./routers/welcomeRouter')
app.use('/', welcomeRouter)

const managerRouter = require('./routers/managerRouter')
app.use('/manager', managerRouter)

const librarianRouter = require('./routers/librarianRouter')
app.use('/librarian', librarianRouter)

const studentRouter = require('./routers/studentRouter')
app.use('/student', studentRouter)

app.get('/failed', (req,res) => {
    res.render('failed',{message: req.query.message})
})

app.get('/success', (req,res) => {
    res.render('success2',{message: req.query.message})
})

app.listen(PORT, () => {
    console.log('sever is running on port '+ PORT)
})