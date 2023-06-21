const {Participant} = require('../beans')

module.exports = (sequelize) => {
    return sequelize.define('participant', Participant);
}