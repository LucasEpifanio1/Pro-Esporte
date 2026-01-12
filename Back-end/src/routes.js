const express = require('express');
const routes = express.Router();

const cidadaoController = require('./controllers/cidadaoController');
const empresaController = require('./controllers/empresaController');
const servidorPublicoController = require('./controllers/servidorPublicoController');
const EventoController = require('./controllers/EventoController');
const OrganizadorController = require('./controllers/organizadorController');

// cidadao
routes.post('/cidadao', cidadaoController.post);

// empresa
routes.post('/empresa', empresaController.post);

// servidor público
routes.post('/servidorPublico', servidorPublicoController.post);

// organizador
routes.post('/organizador', OrganizadorController.post);

// evento
routes.post('/evento', EventoController.post);

module.exports = routes;
