const { Model, DataTypes } = require('sequelize');

class empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: {
          type: DataTypes.CHAR(14),
          primaryKey: true,
        },
        nome: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(100)
      },
      {
        sequelize,
        tableName: 'empresa',
        timestamps: true
      }
    );
  }
}

module.exports = empresa;
