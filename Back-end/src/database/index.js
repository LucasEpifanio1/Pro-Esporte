const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

// Importa os models
const cidadao = require('../models/cidadao');
const empresa = require('../models/empresa');
const servidorPublico = require('../models/servidorPublico');
const Evento = require('../models/evento');
const Exercicio = require('../models/exercicio');

const connection = new Sequelize(dbConfig);

// Inicializa os models
empresa.init(connection);
servidorPublico.init(connection);
cidadao.init(connection);
Evento.init(connection);
Exercicio.init(connection);

module.exports = connection;
