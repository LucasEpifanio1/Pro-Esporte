'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empresa', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cnpj: {
        type: Sequelize.CHAR(14),
        allowNull: false,
        unique: true
      },
      nome: Sequelize.STRING(100),
      email: {
        type: Sequelize.STRING(100),
        unique: true
      },
      telefone: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      senha: Sequelize.STRING(100),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('empresa');
  }
};
