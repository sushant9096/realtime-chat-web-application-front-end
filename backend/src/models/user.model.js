const {User} = require("../beans");
module.exports = (sequelize) => {
    return sequelize.define('user', User);
}