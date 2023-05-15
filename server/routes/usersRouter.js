const Router = require('express').Router
const usersController = require('../controllers/usersController')

const router = new Router();
router.get('/get-users', usersController.getUsers)

module.exports = router