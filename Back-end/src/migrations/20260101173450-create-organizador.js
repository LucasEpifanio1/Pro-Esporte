'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizador', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tipo: {
        type: Sequelize.ENUM('EMPRESA', 'SERVIDOR_PUBLICO'),
        allowNull: false
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'empresa',
          key: 'id'
        }
      },
      servidor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'servidor_publico',
          key: 'id'
        }
      },
      nome_publico: Sequelize.STRING(100),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('organizador');
  }
};
