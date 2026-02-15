const errorMessages = require("../utils/errorMessages");
const httpStatus = require("../utils/httpStatus");

class UserController{
    async index(req, res){

    }
    async create(req, res){
        const {name, email, password}  = req.body;
        if(!email){
            return res.status(httpStatus.FORBIDDEN).json({
                success: false,
                error: errorMessages.AUTH.MISSING_EMAIL
            })
        }
        if(!name){
            return res.status(httpStatus.FORBIDDEN).json({
                success: false,
                error: errorMessages.AUTH.MISSING_NAME
            })
        }
        if(!password){
            return res.status(httpStatus.FORBIDDEN).json({
                success: false,
                error: errorMessages.AUTH.MISSING_PASSWORD
            })
        }
        res.send("Pegando o corpo da requisição")
    }
}

module.exports = new UserController()