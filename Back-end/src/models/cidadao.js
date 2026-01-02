const { Model, DataTypes } = require('sequelize');

class Cidadao extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'cidadao', // nome real da tabela no banco
        timestamps: true,     // createdAt e updatedAt
      }
    );
  }
}

module.exports = Cidadao;
