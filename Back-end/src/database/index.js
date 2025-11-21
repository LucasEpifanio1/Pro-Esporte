const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

// importa os models
const PessoaFisica = require('../models/pessoaFisica');
const empresa = require('../models/empresa');
const servidorPublico = require('../models/servidorPublico');


const connection = new Sequelize(dbConfig);

// inicializa os models
PessoaFisica.init(connection);
empresa.init(connection);
servidorPublico.init(connection);


module.exports = connection;
