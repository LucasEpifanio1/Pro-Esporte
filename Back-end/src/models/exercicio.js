const { Model, DataTypes } = require("sequelize");

class Exercicio extends Model {
  static init(sequelize) {
    super.init(
      {
        id_exercicio: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: DataTypes.STRING(100),
        nivel: DataTypes.INTEGER,
        tipo: DataTypes.STRING(50),
        grupo_muscular: DataTypes.STRING(50),
        descricao: DataTypes.TEXT,
        id_regressao: DataTypes.INTEGER,
        id_progressao: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "Exercicio",
        timestamps: false,
      }
    );
  }
}

module.exports = Exercicio;
