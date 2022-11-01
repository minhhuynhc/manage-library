const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookSchema = new Schema ({
    Name: String,
    libraryName: String,
    status: String,
    borower: String,
})
const book = mongoose.model('book', bookSchema)
module.exports = book