exports.action = async (req, res, next) => {
    console.log(req.body, 'req.body')
    if (req.body.action == 'manager'){
        res.redirect('/manager/login')
    }
    else {
        if (req.body.action == 'librarian'){
            res.redirect('/librarian/login')
        }
        else{
            if (req.body.action == 'student'){
                res.redirect('/student')
            }
        }
    }
}