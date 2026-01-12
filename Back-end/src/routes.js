const express = require('express');
const routes = express.Router();

const cidadaoController = require('./controllers/cidadaoController');
const empresaController = require('./controllers/empresaController');
const servidorPublicoController = require('./controllers/servidorPublicoController');
const EventoController = require('./controllers/EventoController');


// cidadao
routes.post('/cidadao', cidadaoController.post);

// empresa
routes.post('/empresa', empresaController.post);

// servidor público
routes.post('/servidorPublico', servidorPublicoController.post);


// evento
routes.post('/evento', EventoController.post);

module.exports = routes;
