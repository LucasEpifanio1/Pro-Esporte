const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

// importa os models
const PessoaFisica = require("../models/pessoaFisica");

const connection = new Sequelize(dbConfig);

// inicializa os models
PessoaFisica.init(connection);

module.exports = connection;
