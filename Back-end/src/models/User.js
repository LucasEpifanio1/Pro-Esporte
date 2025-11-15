const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      { 
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING, // sempre string (vai ser criptografada)
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      }
    );
  }
}

module.exports = User;
