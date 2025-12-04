const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

// importa os models
const cidadao = require('../models/cidadao')
const empresa = require('../models/empresa');
const servidorPublico = require('../models/servidorPublico');


const connection = new Sequelize(dbConfig);

// inicializa os models

empresa.init(connection);
servidorPublico.init(connection);
cidadao.init(connection);

module.exports = connection;
