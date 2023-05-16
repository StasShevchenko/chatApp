const {Dialogue, PrivateMessage} = require('../models/models')
const moment = require("moment");

module.exports = function (io, socket) {
    socket.on('private-message', async (message) => {
        message = JSON.parse(message)
        console.log(message)
        const dialogue = await Dialogue.findAll({
            where: {
                firstMemberLogin: message.senderLogin,
                secondMemberLogin: message.receiverLogin
            }
        })
        if (!dialogue) {
            const dialogue = await Dialogue.create({
                firstMemberLogin: message.senderLogin,
                secondMemberLogin: message.receiverLogin
            })
        }
        const timestamp = moment().format('dd.MM.yyyy.HH:mm:ss')
        const privateMessage = {
            dialogueId: dialogue.id,
            senderLogin: message.senderLogin,
            content: message.messageContent,
            timestamp: timestamp
        }
        const createdMessage = await PrivateMessage.create(privateMessage)
        console.log(`private-message${message.senderLogin}${message.receiverLogin}`)
        console.log(`private-message${message.receiverLogin}${message.senderLogin}`)
        message.timestamp = timestamp
        io.emit(`private-message${message.senderLogin}${message.receiverLogin}`, JSON.stringify(message))
        io.emit(`private-message${message.receiverLogin}${message.senderLogin}`, JSON.stringify(message))
    })
}