const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cnpj: {
          type: DataTypes.CHAR(14),
          allowNull: false,
          unique: true
        },
        nome: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
        },
        senha: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        telefone: {
          type: DataTypes.STRING(20)
        }
      },
      {
        sequelize,
        tableName: 'empresa',
        timestamps: true
      }
    );
  }
}

module.exports = Empresa;
