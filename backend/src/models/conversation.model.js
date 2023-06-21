const {Conversation} = require('../beans');

module.exports = (sequelize) => {
    return sequelize.define('conversation', Conversation);
}