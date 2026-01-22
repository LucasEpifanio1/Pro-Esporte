const { Model, DataTypes } = require("sequelize");

class Participa extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_Cidadao: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'Cidadao',
            key: 'ID_Cidadao'
          }
        },
        ID_Evento: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'evento',
            key: 'ID_Evento'
          }
        }
      },
      {
        sequelize,
        tableName: "Participa",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.cidadao, { foreignKey: 'ID_Cidadao', as: 'cidadao' });
    this.belongsTo(models.Evento, { foreignKey: 'ID_Evento', as: 'evento' });
  }
}

module.exports = Participa;
