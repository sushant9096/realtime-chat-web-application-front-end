"use strict";

const {Conversation} = require('../beans');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('conversation', Conversation);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('conversation');
    }
}