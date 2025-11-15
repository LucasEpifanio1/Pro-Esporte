const { Model, DataTypes } = require('sequelize');

class Organizer extends Model {
  static init(sequelize) {
    super.init(
      { 
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf_cnpj: DataTypes.STRING,
        senha: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Organizer',
        tableName: 'organizers',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Event, {
      foreignKey: 'organizer_id',
      as: 'events',
    });
  }
}

module.exports = Organizer;
