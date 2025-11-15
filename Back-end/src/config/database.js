module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',       // seu usuário MySQL
  password: 'SUA_SENHA',  // sua senha do MySQL Workbench
  database: 'local123',      // nome do seu schema criado no Workbench
  port: 3306,             // porta padrão do MySQL
  define: {
    timestamps: true,
    underscored: true,
  }
};
