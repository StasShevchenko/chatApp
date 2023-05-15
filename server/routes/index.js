const Router = require('express').Router

const router = new Router();
const authRouter = require('./authRouter')


router.use('/', authRouter)

module.exports = router