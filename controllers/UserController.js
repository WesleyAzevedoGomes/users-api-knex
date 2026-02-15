const User = require('../models/User');
const errorMessages = require('../utils/errorMessages');
const httpStatus = require('../utils/httpStatus');
class UserController{
    async index(req, res){

    }
    async create(req, res){
        const {name, email, password}  = req.body;
        const emailExists = await User.findEmail(email);
        if (emailExists) {
          return res.status(httpStatus.CONFLICT).json({ success: false, message: errorMessages.USER.EMAIL_ALREADY_EXISTS });
        }
        await User.createUser(name, email, password)
        res.status(httpStatus.CREATED).json({
          success: true,
          message: "Usuário criado com sucesso."
        });
    }
}

module.exports = new UserController()