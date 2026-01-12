'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('evento', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      titulo: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      modalidade: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      local: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      horario: {
        type: Sequelize.TIME,
        allowNull: false
      },

      vagas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      imagem: {
        type: Sequelize.STRING(255),
        allowNull: true
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

  async down(queryInterface) {
    await queryInterface.dropTable('evento');
  }
};
