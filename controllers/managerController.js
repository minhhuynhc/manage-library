const libraryModel = require('../models/libraryModel')
const librarianModel = require('../models/librarianModel')
const { redirect } = require('express/lib/response')
const url =require('node:url')

exports.login = async(req, res, next) => {
    if(req.body.Password == "123456"){
        res.redirect(url.format({
            pathname:"/manager",
        }))
    }else{
        res.redirect(url.format({
            pathname:"/failed",
            query: {message: "Wrong password"}
        }))
    }
}

exports.action = async (req, res, next) => {
    console.log(req.body, 'req.body')
    if (req.body.action == 'library'){
        res.redirect('/manager/createLibrary')
    }
    else {
        if (req.body.action == 'librarian'){
            res.redirect('/manager/createLibrarian')
        }
        else {
            if (req.body.action == 'listlibrarian'){
                res.redirect('/manager/listLibrarian')
            }
            else {
                if (req.body.action == 'listlibrary'){
                    res.redirect('/manager/listLibrary')
                }
            }
        }
    }
}

exports.createLibrary = async (req, res, next) => {
    console.log(req.body,' req.body')
    const libraryData = {
        Name: req.body.Name,
        ID: req.body.ID,
        librarianID: req.body.librarianID,
        avaiable: 0,
        unavaiable: 0,
    }
    let d=0
    const librarians = await librarianModel.find()
    for (const i of librarians){
        if (libraryData.librarianID == i.ID){
           d++ 
        }
    }
    if (d==0){
        res.render('creationFailed', {errMessage: "Librarian not exits"})
    }
    else{
    const libraryCreate = await libraryModel.create(libraryData)
    if (libraryCreate) {
        res.redirect('/manager/success')
    }}
}

exports.createLibrarian = async (req, res, next) => {
    console.log(req.body,' req.body')
    const librarianData = {
        Name: req.body.librarianName,
        ID: req.body.librarianID,
    }
    let d=0
    const librarians = await librarianModel.find()
    console.log(d,'d1 ne heeeee')
    for (const i of librarians){
        if (librarianData.ID == i.ID){
           d++ 
        }
    }
    console.log(d,'d ne heeeee')
    if (d>0){
        res.render('creationFailed', {errMessage: "ID already exits"})
    }
    else{
    const librarianCreate = await librarianModel.create(librarianData)
    if (librarianCreate) {
        res.redirect('/manager/success')
    }}
}

exports.recreate = async (req, res, next) => {
    res.redirect('/manager')
}

exports.listLibrary = async (req,res,next) => {
    try{
        let libraries = await libraryModel.find()
        res.render('listLibrary', {libraries: libraries})
    }
    catch (err){
        console.log(err)
    }
}


exports.deleteLibrary = async (req, res) => {
    try {
        const library = await libraryModel.findOne({id: req.query.id})
        if(library) {
            await library.remove();
            res.json({status: 200, message: "delete success"});
        }
        }catch (err) {
            console.log(err,'loi ne heeee')
          }
}
exports.detailLibrary = async (req,res) => {
    try{
        let library = await libraryModel.findOne({_id: req.query.id})
        if(library){console.log('true')} else {console.log('false')}
        res.render('detailLibrary', {library : library})
    }
    catch(err){
        console.log(err)
    }
}

exports.listLibrarian = async (req,res) => {
    try{
        const librarians = await librarianModel.find()
        const libraries = await libraryModel.find()
        res.render('listLibrarian', {librarians: librarians, libraries: libraries})
    }
    catch(err){
        console.log(err)
    }
}