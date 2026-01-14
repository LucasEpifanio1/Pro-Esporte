const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

// importa os models
const cidadao = require('../models/cidadao')
const empresa = require('../models/empresa');
const servidorPublico = require('../models/servidorPublico');
const evento = require('../models/evento');
const Exercicio = require('../models/exercicio');


const connection = new Sequelize(dbConfig);

// inicializa os models

empresa.init(connection);
servidorPublico.init(connection);
cidadao.init(connection);
evento.init(connection);
Exercicio.init(connection);

module.exports = connection;
