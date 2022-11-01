const jwt = require('jsonwebtoken')
function check_authen(req, res, next){
    const token = req.body.access_token
    if(token){
        jwt.decode(token,'congminh', (err,decode)=>{
            if (err){
                return res.json({err:" Token unauthorized"})
            }else{
                req.decode = decode;
                next()
            }
        })
    }else{
        return res.json({err:" Token unauthorized"})
    }
}
module.exports = check_authen
