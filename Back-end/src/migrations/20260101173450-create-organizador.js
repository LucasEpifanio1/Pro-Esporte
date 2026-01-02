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

      nome_publico: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      descricao: {
        type: Sequelize.TEXT
      },

      empresa_cnpj: {
        type: Sequelize.CHAR(14),          // ✔ MESMO tipo
        allowNull: true,
        references: {
          model: 'empresa',
          key: 'CNPJ'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      servidor_cpf: {
        type: Sequelize.CHAR(11),          // ✔ MESMO tipo
        allowNull: true,
        references: {
          model: 'servidor_publico',
          key: 'CPF'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      engine: 'InnoDB' // IMPORTANTE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('organizador');
  }
};
