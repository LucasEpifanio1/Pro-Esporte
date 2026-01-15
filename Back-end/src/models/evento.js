const { Model, DataTypes } = require("sequelize");

class Evento extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_Evento: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: false,
        },
        titulo: DataTypes.STRING,
        modalidade: DataTypes.STRING,
        local: DataTypes.STRING,
        data: DataTypes.DATEONLY,
        horario: DataTypes.TIME,
        vagas: DataTypes.INTEGER,
        descricao: DataTypes.TEXT,
        imagem: DataTypes.STRING,
        FK_Empresa: {
          type: DataTypes.CHAR(14),
          allowNull: true,
          references: {
            model: 'empresa',
            key: 'cnpj'
          }
        },
        FK_Servidor: {
          type: DataTypes.CHAR(11),
          allowNull: true,
          references: {
            model: 'servidor_publico',
            key: 'CPF'
          }
        }
      },
      {
        sequelize,
        tableName: "evento",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.empresa, { 
      foreignKey: 'FK_Empresa', 
      as: 'empresa' 
    });
    this.belongsTo(models.servidorpublico, 
      { foreignKey: 'FK_Servidor', 
        as: 'servidor' 
      });
    this.belongsToMany(models.cidadao, { 
      through: models.Participa, 
      foreignKey: 'ID_Evento', 
      otherKey: 'ID_Cidadao',
      as: 'participantes' 
    });
  }
}

module.exports = Evento;
