const {DataTypes} = require('sequelize');
module.exports = {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}