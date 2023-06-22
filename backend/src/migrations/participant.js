'use strict';

const {Participant} = require("../beans");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('participants', Participant);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('participants');
    }
};
