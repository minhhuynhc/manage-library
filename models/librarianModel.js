const mongoose = require('mongoose')
const Schema = mongoose.Schema
const librarianSchema = new Schema ({
    Name: String,
    ID: String,
})
const librarian = mongoose.model('librarian', librarianSchema)
module.exports = librarian