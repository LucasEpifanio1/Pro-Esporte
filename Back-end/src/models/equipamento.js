const { Model, DataTypes } = require("sequelize");

class Equipamento extends Model {
  static init(sequelize) {
    super.init(
      {
        id_equipamento: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: false,
        },
        nome: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        categoria: {
          type: DataTypes.STRING(50),
        },
      },
      {
        sequelize,
        tableName: "Equipamento",
        timestamps: false,
      }
    );
  }
}

module.exports = Equipamento;
