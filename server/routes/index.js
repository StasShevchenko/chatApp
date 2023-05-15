const Router = require('express').Router

const router = new Router();
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')


router.use('/', authRouter)
router.use('/', usersRouter)

module.exports = router