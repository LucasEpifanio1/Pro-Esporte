const { Model, DataTypes } = require("sequelize");

class empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: {
          type: DataTypes.CHAR(14),
          primaryKey: true,
        },
        nome: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: "empresa",
        timestamps: false,
      }
    );
  }
  static associate(models) {
    // Uma empresa pode ter criado VÁRIOS eventos
    this.hasMany(models.evento, {
      foreignKey: "FK_Empresa", // A mesma chave estrangeira usada no Evento
      as: "eventos", // Apelido para acessarmos: empresa.eventos
    });
  }
}

module.exports = empresa;
