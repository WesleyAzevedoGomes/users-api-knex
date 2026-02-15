const User = require('../models/User');
const errorMessages = require('../utils/errorMessages');
const httpStatus = require('../utils/httpStatus');

class UserController{
    async index(req, res){
      const users = await User.findAll();
      res.status(httpStatus.OK).json({
          success: true,
          message: "Usuários consultados com sucesso.",
          data: [...users]
        });
    }
    async findUser(req, res){
      const id = req.params.id;
      if(!id){
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: errorMessages.AUTH.MISSING_ID,
        })
      } else {
        const user = await User.findById(id)
        if(!user){
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: errorMessages.USER.NOT_FOUND,
          })
        } else {
          res.status(httpStatus.OK).json({
            success: true,
            message: "Usuários consultado com sucesso.",
            data: user,
          });
        }
      }
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