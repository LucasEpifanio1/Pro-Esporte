'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Pessoa_Fisica', {
      CPF: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
     createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }

    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Pessoa_Fisica');
  }
};
