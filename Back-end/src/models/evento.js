const { Model, DataTypes } = require("sequelize");

class evento extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_Evento: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: false,
        },
        Nome: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        Data: {
          type: DataTypes.DATEONLY, // DATEONLY guarda apenas YYYY-MM-DD
          allowNull: false,
        },
        Categoria: {
          type: DataTypes.STRING(100),
        },
        CEP: {
          type: DataTypes.CHAR(8),
        },
        Rua: {
          type: DataTypes.STRING(100),
        },
        Bairro: {
          type: DataTypes.STRING(100),
        },
        Numero: {
          type: DataTypes.STRING(10),
        },
        // Aqui entram as chaves estrangeiras para identificar o criador
        FK_Empresa: {
          type: DataTypes.CHAR(14),
          allowNull: true, // Pode ser nulo se um servidor criou
          references: { model: "empresa", key: "CNPJ" },
        },
        FK_Servidor: {
          type: DataTypes.CHAR(11),
          allowNull: true, // Pode ser nulo se uma empresa criou
          references: { model: "servidor_publico", key: "CPF" },
        },
      },
      {
        sequelize,
        tableName: "evento",
        timestamps: false,
      }
    );
  }
}

module.exports = evento;
