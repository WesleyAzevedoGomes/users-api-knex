const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User{
    async createUser(name, email, password){
        try {
            const hash = await bcrypt.hash(password, 10)
            await knex.insert({name, email, password: hash, role: 0}).table('users')
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
}

module.exports = new User();