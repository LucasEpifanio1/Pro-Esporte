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
        }
      },
      titulo: Sequelize.STRING(100),
      modalidade: Sequelize.STRING(50),
      local: Sequelize.STRING(100),
      data: Sequelize.DATEONLY,
      horario: Sequelize.TIME,
      vagas: Sequelize.INTEGER,
      descricao: Sequelize.TEXT,
      imagem: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('evento');
  }
};
