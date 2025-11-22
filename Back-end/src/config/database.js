module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "proesporte", //Foi trocado para minúsculas por conta de 'ERROR: Unknown database 'proesporte'' ao usar o comando npx pois o node por padrão utiliza minúsculas, então estou tentando resolver esse problema de case sensitivy
  define: {
    timestamps: true,
    underscored: false,
  },
};
