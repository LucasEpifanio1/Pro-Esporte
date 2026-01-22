const { Model, DataTypes } = require("sequelize");

class seleciona extends Model {
  static init(sequelize) {
    super.init(
      {
        id_rotina_treino: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: { model: 'Rotina_Treino', key: 'id_rotina_treino' }
        },
        id_exercicio: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: { model: 'Exercicio', key: 'id_exercicio' }
        },
        series: DataTypes.STRING(50),
        repeticoes_ou_tempo: DataTypes.STRING(50),
        ordem_execucao: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: "Seleciona",
        timestamps: false // Essa tabela geralmente não precisa de createAt/updateAt
      }
    );
  }
}

module.exports = seleciona;