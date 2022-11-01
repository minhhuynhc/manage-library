const mongoose = require('mongoose')
const Schema = mongoose.Schema
const studentSchema = new Schema ({
    Name: String,  
    ID: String,  
})
const student = mongoose.model('student', studentSchema)
module.exports = student