const { Model, DataTypes } = require('sequelize');

class Evento extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        modalidade: DataTypes.STRING,
        local: DataTypes.STRING,
        data: DataTypes.DATEONLY,
        horario: DataTypes.TIME,
        vagas: DataTypes.INTEGER,
        descricao: DataTypes.TEXT,
        imagem: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'evento',
        timestamps: true
      }
    );
  }
}

module.exports = Evento;
