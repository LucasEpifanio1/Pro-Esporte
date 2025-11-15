const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        date: DataTypes.DATE,
        location: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Event',
        tableName: 'events',
      }
    );
  }

  static associate(models) {
    // Exemplo: um evento pertence a um usuário
    Event.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Event;
