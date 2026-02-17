const knex = require('../database/connection');
const httpStatus = require('../utils/httpStatus');
const utilMessages = require('../utils/utilMessages');
const User = require('./User')
const { randomUUID } = require('crypto');


class PasswordToken{
    async create(email){
        const user = await User.findByEmail(email)
        if(user){
            try {
                const token = randomUUID();
                await knex.insert({ user_id: user.id, used: 0, token: token }).table('passwordTokens');
                return {success: true, message: utilMessages.SUCCESS.TOKEN_SEND, token: token, http: httpStatus.OK }
            } catch(err){
                console.log(err)
                return { success: false, message: utilMessages.DEFAULT.INTERNAL_ERROR, http: httpStatus.INTERNAL_SERVER_ERROR }
            }
        } else {
            return { success: false, message: utilMessages.USER.NOT_FOUND, http: httpStatus.NOT_FOUND }
        }
    }
}

module.exports = new PasswordToken();