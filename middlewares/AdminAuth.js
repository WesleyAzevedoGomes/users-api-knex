const utilMessages = require("../utils/utilMessages")
const httpStatus = require("../utils/httpStatus")
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authToken = req.headers.authorization
    if(authToken){
        const bearer = authToken.split(' ')
        const token = bearer[1]
        try {
            const decoded = jwt.verify(token, process.env.SECRET_JWT)
            if (decoded.role == 1) {
              next();
            } else {
              return res.status(httpStatus.UNAUTHORIZED).json({
                succes: false,
                message: utilMessages.AUTH.FORBIDDEN,
              });
            }
        } catch(err){
            console.log(err)
            return res.status(httpStatus.UNAUTHORIZED).json({
            succes: false,
            message: utilMessages.AUTH.INVALID_TOKEN
        })
        }
    } else {
        return res.status(httpStatus.UNAUTHORIZED).json({
            succes: false,
            message: utilMessages.AUTH.UNAUTHORIZED
        })
    }
}