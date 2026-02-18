const knex = require('../database/connection')
const bcrypt = require('bcrypt');
const utilMessages = require('../utils/utilMessages');
const httpStatus = require('../utils/httpStatus');

class User{
    async findAll(){
        try {
            const result = await knex.select('id', 'name', 'email', 'role').table('users')
            return result;
        } catch(err){
            console.log(err)
            return [];
        }
    }

    async findById(id){
        try {
            const result = await knex.select('id', 'name', 'email', 'role').table('users').where({id: id}).first()
            if(result){
                return result;
            } else {
                return undefined
            }
        } catch(err){
            console.log(err)
            return undefined;
        }
    }
    async findByEmail(email){
        try {
            const result = await knex.select('id', 'name', 'email', 'password', 'role').table('users').where({email: email}).first()
            if(result){
                return result;
            } else {
                return undefined
            }
        } catch(err){
            console.log(err)
            return undefined;
        }
    }

    async createUser(name, email, password, role){
        try {
            let roleInformation;
            role ? roleInformation = 1 : roleInformation = 0
            const hash = await bcrypt.hash(password, 10)
            const user = await knex.insert({name, email, password: hash, role: roleInformation}).table('users')
            return user
        } catch(err){
            console.log(err.sqlMessage)
        }
    }
    async findEmail(email){
        try {
            const result = await knex.select('email').table('users').where({email: email})
            if(result.length > 0){
                return true;
            } else {
                return false;
            }
        } catch(err){
            console.log(err.sqlMessage)
            return false;
        }
    }

    async update(id, name, email, role){
        try {
            const user = await this.findById(id);
            if(user){
                const editUser = {};
                if(email !== undefined){
                    if (email !== user.email) {
                      const result = await this.findEmail(email);
                      if (!result) {
                        editUser.email = email;
                      } else {
                        return { success: false, message: utilMessages.USER.EMAIL_ALREADY_EXISTS, http: httpStatus.CONFLICT }
                      }
                    } else {
                        return { success: false, message: utilMessages.USER.EMAIL_ALREADY_EXISTS, http: httpStatus.CONFLICT }
                    }
                }
                if(name) editUser.name = name;
                if(role != undefined) editUser.role = role;
                await knex.update(editUser).where({id: id}).table('users')
                return { success: true, message: utilMessages.SUCCESS.USER_UPDATED, http: httpStatus.OK}
            } else {
                return { success: false, message: utilMessages.USER.NOT_FOUND, http: httpStatus.NOT_FOUND }
            }
        } catch(err){
            console.log(err)
            return { success: false, message: utilMessages.DEFAULT.INTERNAL_ERROR, http: httpStatus.INTERNAL_SERVER_ERROR }
        }
    }
    async delete(id){
        const user = await this.findById(id)
        if(user){
            try {
                await knex.delete().where({id: id}).table('users')
                return { success: true, message: utilMessages.SUCCESS.USER_UPDATED, http: httpStatus.OK}
            } catch(err){
                console.log(err)
                return { success: false, message: utilMessages.DEFAULT.INTERNAL_ERROR, http: httpStatus.INTERNAL_SERVER_ERROR }
            }
        } else {
            return { success: false, message: utilMessages.USER.NOT_FOUND, http: httpStatus.NOT_FOUND }
        }
    }
    async changePassword(newPassword, id, token){
        const hash = await bcrypt.hash(newPassword, 10)
        try {
            await knex.transaction(async trx => {
            await trx('users').where({id: id}).update({password: hash})
            await trx('passwordTokens').where({user_id: id, token: token}).update({used: 1})
            })
        } catch(err){
            console.log(err)
        } 
    }
}

module.exports = new User();