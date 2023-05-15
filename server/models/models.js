const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const PublicMessage = sequelize.define('public_message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.STRING, allowNull: false},
    timestamp: {type: DataTypes.STRING, allowNull: false},
    senderLogin: {type: DataTypes.STRING, allowNull: false, unique: true},
    senderName: {type: DataTypes.STRING, allowNull: false}
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    login: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
})

const PrivateMessage = sequelize.define('private_message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.STRING, allowNull: false},
    timestamp: {type: DataTypes.STRING, allowNull: false},
    senderLogin: {type: DataTypes.STRING, allowNull: false}
})

const Dialogue = sequelize.define('dialogue', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstMemberLogin: {type: DataTypes.STRING},
    secondMemberLogin: {type: DataTypes.STRING}
})

Dialogue.hasMany(PrivateMessage);
PrivateMessage.belongsTo(Dialogue);

module.exports = {
    User,
    PrivateMessage,
    Dialogue,
    PublicMessage
}