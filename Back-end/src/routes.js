const express = require('express');
const routes = express.Router();

const cidadaoController = require('./controllers/cidadaoController')
const empresaController = require('./controllers/empresaController');
const servidorPublicoController = require('./controllers/servidorPublicoController');
const EventoController = require('./controllers/EventoController');
const organizadorController = require('./controllers/organizadorController');

//organizador
routes.post('/organizador', organizadorController.store);
routes.get('/organizador', organizadorController.index);
routes.get('/organizador/:id', organizadorController.show); 
// cidadao
routes.post('/cidadao', cidadaoController.store);
routes.get('/cidadao', cidadaoController.index);
///empresa
routes.post('/empresa',empresaController.store);
///evento
routes.post('/evento', EventoController.store);
routes.get('/evento', EventoController.index);
routes.get('/evento/:id', EventoController.show);
routes.put('/evento/:id', EventoController.update);
routes.delete('/evento/:id', EventoController.delete);


///servidorpublico
routes.post('/servidorPublico',servidorPublicoController.store);
module.exports = routes;


 