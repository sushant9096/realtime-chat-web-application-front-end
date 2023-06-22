'use strict';

const {User} = require("../beans");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', User);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
