const { Model, DataTypes } = require('sequelize');

class ServidorPublico extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cpf: {
          type: DataTypes.CHAR(11),
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
        tableName: 'servidor_publico',
        timestamps: true
      }
    );
  }
}

module.exports = ServidorPublico;
