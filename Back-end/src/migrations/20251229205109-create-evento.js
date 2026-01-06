"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("evento", {
      ID_Evento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      Nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Data: {
        type: Sequelize.DATEONLY, // DATEONLY guarda apenas YYYY-MM-DD
        allowNull: false,
      },
      Categoria: {
        type: Sequelize.STRING(100),
      },
      CEP: {
        type: Sequelize.CHAR(8),
      },
      Rua: {
        type: Sequelize.STRING(100),
      },
      Bairro: {
        type: Sequelize.STRING(100),
      },
      Numero: {
        type: Sequelize.STRING(10),
      },
      // Aqui entram as chaves estrangeiras para identificar o criador
      FK_Empresa: {
        type: Sequelize.CHAR(14),
        allowNull: true, // Pode ser nulo se um servidor criou
        references: { model: "empresa", key: "CNPJ" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      FK_Servidor: {
        type: Sequelize.CHAR(11),
        allowNull: true, // Pode ser nulo se uma empresa criou
        references: { model: "servidor_publico", key: "CPF" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("evento");
  },
};
