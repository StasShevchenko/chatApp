const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const {Op} = require("sequelize");

class UsersController {
    async getUsers(req, res, next) {
        const {userLogin} = req.query
        if (!userLogin) {
            next(ApiError.badRequest('Некорректные параметры запроса'))
        }
        let users = await User.findAll({where: {[Op.not]: [{login: userLogin}]}});
        users = users.map((user) => {
                return {name: user.name, login: user.login}
            }
        )
        return res.status(200).json(users)
    }
}

module.exports = new UsersController()