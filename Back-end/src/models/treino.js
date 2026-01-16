const { Model, DataTypes } = require("sequelize");

class Treino extends Model {
  static init(sequelize) {
    super.init(
      {
        id_treino: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_cidadao: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        perfil_identificado: DataTypes.STRING(100),
        objetivo: DataTypes.STRING(50),
        divisao: DataTypes.STRING(100),
        descricao: DataTypes.TEXT,
        instrucoes_gerais: DataTypes.TEXT,
        dados_treino: DataTypes.JSON,
      },
      {
        sequelize,
        tableName: "treino",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    // Se houver necessidade de associação futura
  }
}

module.exports = Treino;
