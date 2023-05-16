require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const path = require("path");
const http = require('http')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const {Server} = require('socket.io')
const messageRouter = require('./socket/socketMessageRouter')

const PORT = 7000 || process.env.PORT
const app = express()
const server = http.createServer(app);
const io = new Server(server, {cors:{origin: "*", methods: "*"}});
console.log(io.path())
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/',router)

io.on('connection', socket => {
    messageRouter(io, socket)
})

const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => console.log(`App is live on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start();

