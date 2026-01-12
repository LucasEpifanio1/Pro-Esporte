'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('servidor_publico', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true
      },
      nome: Sequelize.STRING(100),
      email: {
        type: Sequelize.STRING(100),
        unique: false
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
    await queryInterface.dropTable('servidor_publico');
  }
};
