'use strict';
const bcrypt = require('bcryptjs');
const { contrasenia } = require('../../models/Usuarios');
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Jose',
        apellido: 'Benitez',
        email: 'jose.benitez@ce.ucn.cl',
        contrasenia: bcrypt.hashSync('jbenitez123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
