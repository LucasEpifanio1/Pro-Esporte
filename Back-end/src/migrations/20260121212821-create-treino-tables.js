"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Tabela de Ligação Cidadao_Equipamento
    await queryInterface.createTable('Cidadao_Equipamento', {
      ID_Cidadao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Cidadao', key: 'ID_Cidadao' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_equipamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Equipamento', key: 'id_equipamento' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 2. Tabela Rotina_Treino
    await queryInterface.createTable('Rotina_Treino', {
      id_rotina_treino: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      descricao: { type: Sequelize.STRING(255) },
      nivel: { type: Sequelize.INTEGER },
      ID_Cidadao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Cidadao', key: 'ID_Cidadao' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      perfil_identificado: { type: Sequelize.STRING(100) }, //apagar
      objetivo: { type: Sequelize.STRING(50) },
      divisao: { type: Sequelize.STRING(100) },
      instrucoes_gerais: { type: Sequelize.TEXT },
      data_criacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      // Campos de controle do Sequelize (opcionais se usar timestamps: false no model)
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 3. Tabela Seleciona (Itens da Rotina)
    await queryInterface.createTable('seleciona', {
      id_rotina_treino: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Rotina_Treino', key: 'id_rotina_treino' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_exercicio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Exercicio', key: 'id_exercicio' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      series: {
        type: Sequelize.STRING(50), // Alterado para String conforme solicitado
        allowNull: true
      },
      repeticoes_ou_tempo: {
        type: Sequelize.STRING(50), // Alterado para String conforme solicitado
        allowNull: true
      },
      ordem_execucao: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove na ordem inversa para não violar chaves estrangeiras
    await queryInterface.dropTable('seleciona');
    await queryInterface.dropTable('Rotina_Treino');
    await queryInterface.dropTable('Cidadao_Equipamento');
  }
};