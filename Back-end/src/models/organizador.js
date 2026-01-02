const { Model, DataTypes } = require('sequelize');

class Organizador extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: {
          type: DataTypes.ENUM('EMPRESA', 'SERVIDOR_PUBLICO'),
          allowNull: false
        },
        nome_publico: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        descricao: DataTypes.TEXT
      },
      {
        sequelize,
        tableName: 'organizador',
        timestamps: true
      }
    );
  }

static associate(models) {
  Organizador.belongsTo(models.Empresa, {
    foreignKey: 'empresa_cnpj'
  });

  Organizador.belongsTo(models.ServidorPublico, {
    foreignKey: 'servidor_id'
  });

  Organizador.hasMany(models.Evento, {
    foreignKey: 'organizador_id'
  });
}

}

module.exports = Organizador;
