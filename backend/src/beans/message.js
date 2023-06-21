const {DataTypes} = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {  // Message content
        type: DataTypes.STRING,
        allowNull: false,
    },
}