const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init(
      { id:DataTypes.STRING,
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
    this.belongsTo(models.Organizer, {
      foreignKey: 'organizer_id',
      as: 'organizer',
    });
  }
}

module.exports = Event;
