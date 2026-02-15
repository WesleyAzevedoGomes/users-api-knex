class UserController{
    async index(req, res){

    }
    async create(req, res){
        const {name, email, password}  = req.body;
        res.send("Pegando o corpo da requisição")
    }
}

module.exports = new UserController()