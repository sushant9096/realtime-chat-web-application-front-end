const {DataTypes} = require('sequelize');
module.exports = {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
    },
    conversionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}