const User = require('../models/User');
const utilMessages = require('../utils/utilMessages');
const httpStatus = require('../utils/httpStatus');
const PasswordToken = require('../models/PasswordToken');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()


class UserController{
    async index(req, res){
      const users = await User.findAll();
      res.status(httpStatus.OK).json({
          success: true,
          message: "Usuário consultados com sucesso.",
          data: [...users]
        });
    }
    async findUser(req, res){
      const id = req.params.id;
      if(!id){
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: utilMessages.AUTH.MISSING_ID,
        })
      } else {
        const user = await User.findById(id)
        if(!user){
          return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: utilMessages.USER.NOT_FOUND,
          })
        } else {
          res.status(httpStatus.OK).json({
            success: true,
            message: "Usuário consultado com sucesso.",
            data: user,
          });
        }
      }
    }

    async create(req, res){
        const {name, email, password, role}  = req.body;
        const emailExists = await User.findEmail(email);
        if (emailExists) {
          return res.status(httpStatus.CONFLICT).json({ success: false, message: utilMessages.USER.EMAIL_ALREADY_EXISTS });
        }
        const idUser = await User.createUser(name, email, password, role)
        res.status(httpStatus.CREATED).json({
          success: true,
          message: utilMessages.SUCCESS.USER_CREATED,
          data: {
            id: idUser[0],
            name,
            email
          }
        });
    }
    async edit(req, res){
      const {id, name, email, role} = req.body;
      const result = await User.update(id, name, email, role);
      if(result){
        const {success, message, http} = result;
        if(result.success){
          res.status(http).json({
            success,
            message
          })
        } else {
          res.status(http).json({
            success,
            message
          })
        }
      }
    }
    async delete(req, res){
      const id = req.params.id;
      const result = await User.delete(id);
      if(result){
        const {success, message, http} = result;
        if(result.success){
          return res.status(http).json({
            success,
            message
          })
        } else {
          return res.status(http).json({
            success,
            message
          })
        }
      }
    }
    async recoverPassword(req, res){
      const email = req.body.email;
      const result = await PasswordToken.create(email)
      const {success, message, token, http} = result;
      if(success){
        return res.status(http).json({
          success,
          message,
          token: token
        })
      } else {
        return res.status(http).json({
          success,
          message
        })
      }
    }
    async changePassword(req, res){
      const {token, password} = req.body;
      const isTokenValid = await PasswordToken.validate(token)
      const {success, message, http} = isTokenValid;
      if(success){
        await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
        return res.status(http).json({
          success,
          message
        })
      } else {
        res.status(http).json({
          success,
          message
        })
      }
    }
    async login(req, res){
      const {email, password} = req.body;
      const user = await User.findByEmail(email);
      if(user) {
        const result = await bcrypt.compare(password, user.password);
        if(result){
          const expiresIn = 60 * 60 * 2;
          const token = jwt.sign({email: user.email, role: user.role}, process.env.SECRET_JWT, { expiresIn })
          res.status(httpStatus.OK).json({
            success: result, 
            access_token: token,
            expiresIn
          })
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: utilMessages.USER.WRONG_PASSWORD
        })
        }
      } else {
        res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: utilMessages.USER.NOT_FOUND
        })
      }
    }
}

module.exports = new UserController()