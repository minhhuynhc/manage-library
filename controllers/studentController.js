const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const studentModel = require('../models/studentModel')
const bookModel = require('../models/bookModel')
const libraryModel = require('../models/libraryModel')
const authen = require('../middlewares/authen')
const url =require('node:url')
const { redirect } = require('express/lib/response')
const book = require('../models/bookModel')

exports.login = async (req,res,next) => {
    if (req.body.borow == undefined && req.body.return == undefined){
    const student = await studentModel.findOne({ ID : req.body.id})
    let books = await bookModel.find()
    if (student){
        console.log(books)
        let d=0
        let borowing = new Array()
        for (let i of books ){
            if (i.borower == student.Name) {
                borowing[borowing.length] = i.Name
    
            }
            console.log(i.borower)
        }
        console.log(req.body.id,' req.body.id')
        res.redirect(url.format({
            pathname: '/student/studentAction',
            query: {
                name: student.Name,
                book: borowing,
                number: borowing.length
            }
        }))
    }
    else{ res.redirect(url.format({
        pathname:"/failed",
        query: {message: "ID not exits"}
    }))} 
    }
}   

exports.action = async (req, res, next) => {
    let books = await bookModel.find()
    console.log(req.body.borow, 'req.body')
    if (req.body.borow != undefined ){
        let avaiable = new Array()
        for (let i of books ){
            if (i.status == "avaiable") {
                avaiable[avaiable.length] = i.Name
            }
            console.log(i.status)
        }
        res.redirect(url.format({
            pathname: '/student/studentBorow',
            query: {
                name: req.body.borow,
                book: avaiable,
                number: avaiable.length
            }
        }))
    }
    else if (req.body.return != undefined ){
        console.log("diennnnnnnnnn",req.body)

        let borowing =[]
        for (let i of books ){
            if (i.borower == req.body.return) {
                borowing[borowing.length] = i.Name
            }
        }
        console.log(borowing, 'aluuuuuuuuuuuuu')
        res.redirect(url.format({
            pathname: '/student/studentReturn',
            query: {
                name: req.body.return,
                book: borowing,
                number: borowing.length
            }
        }))
    }
}



exports.borow = async( req, res, next) => {
    console.log(typeof(req.body.borow)) 
    if (typeof(req.body.borow) !="string") 
        {for (i of req.body.borow){
        const book = await bookModel.findOne({Name: i})
        console.log(book,'dsdsadsdsadsadsadsadsadsa')
        book.borower = req.body.borower
        book.status = "unavaiable"
        book.save()
        const library = await libraryModel.findOne({Name: book.libraryName})
        console.log(' ten thu vien ne:', library)
        library.avaiable -= 1
        library.unavaiable +=1
        library.save()
        
    } 
    res.redirect(url.format({
        pathname: '/success',
        query: {
            message: "Borrow book!"
        }
    }))
    }
    else {
        const book = await bookModel.findOne({Name: req.body.borow})
        console.log(book,'dsdsadsdsadsadsadsadsadsa')
        book.borower = req.body.borower
        book.status = "unavaiable"
        book.save()
        const library = await libraryModel.findOne({Name: book.libraryName})
        console.log(' ten thu vien ne:', library)
        library.avaiable -= 1
        library.unavaiable +=1
        library.save()
        res.redirect(url.format({
            pathname: '/success',
            query: {
                message: "Borrow book!"
            }
        }))
    }
}

exports.return = async( req, res, next) => {
    console.log(typeof(req.body.borow)) 
    if (typeof(req.body.borow) !="string") {for (i of req.body.borow){

        const book = await bookModel.findOne({Name: i})
        console.log(book,'dsdsadsdsadsadsadsadsadsa')
        book.borower = "noone"
        book.status = "avaiable"
        book.save()
        const library = await libraryModel.findOne({Name: book.libraryName})
        console.log(' ten thu vien ne:', library)
        library.avaiable += 1
        library.unavaiable -=1
        library.save()
    } 
    res.redirect(url.format({
        pathname: '/success',
        query: {
            message: "Return book!"
        }
    }))
    }
    else {
        const book = await bookModel.findOne({Name: req.body.borow})
        console.log(book,'dsdsadsdsadsadsadsadsadsa')
        book.borower = "noone"
        book.status = "avaiable"
        book.save()
        const library = await libraryModel.findOne({Name: book.libraryName})
        console.log(' ten thu vien ne:', library)
        library.avaiable += 1
        library.unavaiable -=1
        library.save()
        res.redirect(url.format({
            pathname: '/success',
            query: {
                message: "Return book!"
            }
        }))
    }
}