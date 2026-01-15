const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

// Importa os models
const cidadao = require('../models/cidadao');
const empresa = require('../models/empresa');
const servidorPublico = require('../models/servidorPublico');
const evento = require('../models/evento');
const Exercicio = require('../models/exercicio');
const Participa = require('../models/participa');

const connection = new Sequelize(dbConfig);

// Inicializa os models
empresa.init(connection);
servidorPublico.init(connection);
cidadao.init(connection);
evento.init(connection);
Exercicio.init(connection);
Participa.init(connection);

// Chama as associações
cidadao.associate(connection.models);
empresa.associate(connection.models);
servidorPublico.associate(connection.models);
evento.associate(connection.models);
Participa.associate(connection.models);

module.exports = connection;
