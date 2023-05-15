require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const path = require("path");
const http = require('http')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const socketio = require('socket.io')

const PORT = 7000 || process.env.PORT
const app = express()
const server = http.createServer(app);
const io = socketio(server);
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/',router)
app.use(errorHandler)


const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`App is live on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start();

