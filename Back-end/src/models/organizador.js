const { Model, DataTypes } = require('sequelize');

class Organizador extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: DataTypes.ENUM('EMPRESA', 'SERVIDOR_PUBLICO'),
        nome_publico: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'organizador',
        timestamps: true
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Empresa, {
      foreignKey: 'empresa_id',
      as: 'empresa'
    });

    this.belongsTo(models.ServidorPublico, {
      foreignKey: 'servidor_id',
      as: 'servidor'
    });

    this.hasMany(models.Evento, {
      foreignKey: 'organizador_id',
      as: 'eventos'
    });
  }
}

module.exports = Organizador;
