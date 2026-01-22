const { Model, DataTypes } = require("sequelize");

class cidadao extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_Cidadao: {
          type: DataTypes.INTEGER,
          autoIncrement: false,
          primaryKey: true,
        },
        nome: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(100),
        respondeuQuestionario: DataTypes.BOOLEAN
      },
      {
        sequelize,
        tableName: "Cidadao", // nome real da tabela no banco
        timestamps: false, // createdAt e updatedAt
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Evento, { 
      through: models.Participa, 
      foreignKey: 'ID_Cidadao', 
      otherKey: 'ID_Evento',
      as: 'eventos' 
    });
  }
}

module.exports = cidadao;
