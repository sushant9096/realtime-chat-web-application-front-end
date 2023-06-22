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
        unique: 'conversation_participant'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'conversation_participant'
    }
}