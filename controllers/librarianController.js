const libraryModel = require('../models/libraryModel')
const librarianModel = require('../models/librarianModel')
const bookModel = require('../models/bookModel')
const studentModel = require('../models/studentModel')
const { redirect } = require('express/lib/response')
const url =require('node:url')
// exports.action = async (req, res, next) => {
//     console.log(req.body, 'req.body')
//     if (req.body.action == 'addbook'){
//         res.redirect('/librarian/addbook')
//     }
//     else {
//         if (req.body.action == 'readbook'){
//             res.redirect('/librarian/readbook')
//         }
//         else{
//             if (req.body.action == 'updatebook'){
//                 res.redirect('/librarian/updatebook')
//             }
//             else{
//                 res.redirect('/librarian/deletebook')
//             }
//         }
//     }
// }
exports.login = async (req, res, next) => {
    const check = await librarianModel.findOne({ID: req.body.ID})
    if (check) {
        console.log(req.body.ID,'lsolsolso')
        res.redirect(url.format({
            pathname:"/librarian",
            query: {ID: req.body.ID}
        }))
    }else{
        res.redirect(url.format({
            pathname:"/failed",
            query: {message: "ID not exits"}
        }))
    }
    }

exports.action = async (req, res, next) => {
    console.log(req.body, 'req.body')
    if (req.body.action == 'createBook'){        
        const libraries = await libraryModel.find({librarianID : req.body.ID})
        console.log(libraries)
        let name = []
        for (i of libraries){name[name.length]=i.Name}
        console.log(name,'name neeee')
        res.redirect(url.format({
            pathname: "/librarian/createBook",
            query: {
                ID: req.body.ID,
                libraries: name, 
            }
        }))
    }
    else {
        if (req.body.action == 'createStudent'){
            res.redirect('/librarian/createStudent')
        }
    }
}


exports.createBook = async (req, res, next) => {
    console.log(req.body,'req.body createBook')
    const bookData = {
        Name: req.body.name,
        libraryName: req.body.libraryName,
        status: "avaiable",
        borower: "noone"
    }
    const bookAdd = await bookModel.create(bookData)
    if(bookAdd) {
        res.redirect('/librarian/success')
        const library = await libraryModel.findOne({Name: bookData.libraryName})
        console.log(' ten thu vien ne:', library)
        library.avaiable += 1
        library.save()
    }
}

exports.createStudent = async (req, res, next) => {
    console.log(req.body,'req.body')
    const studentData = {
        Name: req.body.name,
        ID: req.body.id,
    }
    const check = await studentModel.findOne({ID: req.body.id})
    if (check){
        res.redirect(url.format({
            pathname:"/failed",
            query: {message: "Student ID already exits"}
        }))
        console.log("???")
    }
    else{
    const studentAdd = await studentModel.create(studentData)
    if(studentAdd) {
        res.redirect('/librarian/success')
    }
    }
}