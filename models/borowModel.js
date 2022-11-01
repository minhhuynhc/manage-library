const mongodb = require('mongoose')
const Schema = mongoose.Schema
const librarySchema = new Schema ({
    studentID: String,
    studentName: String,
    bookID: String,
    borowDate: String,
    returnDate: String
})
const library = mongoose.model('library', librarySchema)
module.exports = library