"use strict";

const { Message } = require("../beans");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('messages', Message);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('messages');
    }
}