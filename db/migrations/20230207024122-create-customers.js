'use strict';

/** @type {import('sequelize-cli').Migration} */
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.drop(CUSTOMER_TABLE);
  }
};
