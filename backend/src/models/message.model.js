const {Message} = require('../beans')

module.exports = (sequelize) => {
    return sequelize.define('message', Message);
}