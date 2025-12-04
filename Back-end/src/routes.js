const express = require('express');
const routes = express.Router();

const cidadaoController = require('./controllers/cidadaoController')
const empresaController = require('./controllers/empresaController');
const servidorPublicoController = require('./controllers/servidorPublicoController');
// cidadao
routes.post('/cidadao', cidadaoController.store);
routes.get('/cidadao', cidadaoController.index);
///empresa
routes.post('/empresa',empresaController.store);
///servidorpublico
routes.post('/servidorPublico',servidorPublicoController.store);
module.exports = routes;


 