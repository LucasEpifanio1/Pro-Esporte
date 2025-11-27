const { Model, DataTypes } = require('sequelize');

class servidorpublico extends Model {
  static init(sequelize) {
    super.init(
      {
        CPF: {
          type: DataTypes.CHAR(11),
          primaryKey: true,
        },
        nome: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'servidor_publico',
      }
    );
  }
}

module.exports = servidorpublico;
