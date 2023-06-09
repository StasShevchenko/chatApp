const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
class AuthController {

    async register(req, res, next) {
        const {login, password, userName} = req.body
        if(!login || !password || !userName){
            return next(ApiError.badRequest('Некорректные данные для регистрации'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.exists('Пользователь с таким логином уже существует'))
        }
        const user = await User.create({name: userName, login, password})
        return res.status(201).json(user)
    }

    async login(req, res, next) {
        const {login, password} = req.query
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректные данные'))
        }
        const candidate = await User.findOne({where: {login, password}})
        if (!candidate) {
            return next(ApiError.badRequest('Неправильные логин или пароль'))
        }
        return res.status(200).json({login: candidate.login, name: candidate.name})
    }

}

module.exports = new AuthController()