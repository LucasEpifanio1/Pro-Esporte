const { Sequelize, or } = require("sequelize");
const dbConfig = require("../config/database");

// importa os models
const Empresa = require('../models/empresa');
const ServidorPublico = require('../models/servidorPublico');
const Cidadao = require('../models/cidadao');
const Evento = require('../models/evento');
const Organizador = require('../models/organizador');



const connection = new Sequelize(dbConfig);

// inicializa os models

Empresa.init(connection);
ServidorPublico.init(connection);
Cidadao.init(connection);
Organizador.init(connection);
Evento.init(connection);

// associações
Organizador.associate(connection.models);
Evento.associate(connection.models);


module.exports = connection;
