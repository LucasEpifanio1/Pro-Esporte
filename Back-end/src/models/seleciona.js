const { Model, DataTypes } = require("sequelize");

class Seleciona extends Model {
  static init(sequelize) {
    super.init(
      {
        id_seleciona: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: false
        },
        id_rotina_treino: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Rotina_Treino', key: 'id_rotina_treino' }
        },
        id_exercicio: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Exercicio', key: 'id_exercicio' }
        },
        dia: DataTypes.STRING(50),
        series: DataTypes.STRING(50),
        repeticoes_ou_tempo: DataTypes.STRING(50),
        ordem_execucao: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: "Seleciona",
        timestamps: false
      }
    );
  }
  static associate(models) {
     this.belongsTo(models.RotinaTreino, { foreignKey: 'id_rotina_treino' });
     this.belongsTo(models.Exercicio, { foreignKey: 'id_exercicio', as: 'exercicio' });
   }
}

module.exports = Seleciona;