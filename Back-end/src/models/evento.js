const { Model, DataTypes } = require('sequelize');

class Evento extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: {
          type: DataTypes.STRING,
          allowNull: false
        },
        modalidade: {
          type: DataTypes.STRING,
          allowNull: false
        },
        local: {
          type: DataTypes.STRING,
          allowNull: false
        },
        data: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        horario: {
          type: DataTypes.TIME,
          allowNull: false
        },
        vagas: DataTypes.INTEGER,
        descricao: DataTypes.TEXT
      },
      {
        sequelize,
        tableName: 'evento',
        timestamps: true
      }
    );
  }

 static associate(models) {
  Evento.belongsTo(models.Organizador, {
    foreignKey: 'organizador_id'
  });
}

}

module.exports = Evento;
