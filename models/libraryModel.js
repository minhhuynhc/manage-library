const mongoose = require('mongoose')
const Schema = mongoose.Schema
const librarySchema = new Schema ({
    Name: String,  
    ID: String,  
    librarianID: String,
    avaiable: Number,
    unavaiable: Number,
})
const library = mongoose.model('library', librarySchema)
module.exports = library