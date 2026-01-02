'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('evento', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      organizador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'organizador',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      modalidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      local: {
        type: Sequelize.STRING,
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
      vagas: Sequelize.INTEGER,
      descricao: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('evento');
  }
};
