const express = require('express');
const routes = express.Router();

const PessoaFisicaController = require('../src/controllers/PessoaFisicaController');
const empresaController = require('./controllers/empresaController');
const servidorPublicoController = require('./controllers/servidorPublicoController');
// PESSOA FÍSICA
routes.get('/pessoafisica', PessoaFisicaController.index);
routes.post('/pessoafisica', PessoaFisicaController.store);
routes.put('/pessoafisica/:CPF', PessoaFisicaController.update);
routes.delete('/pessoafisica/:CPF', PessoaFisicaController.delete);
///empresa
routes.post('/empresa',empresaController.store);
///servidorpublico
routes.post('/servidorPublico',servidorPublicoController.store);
module.exports = routes;


//pq tem rotas para pessoa fisica e servidor publico? o servidor publico já é uma pessoa fisica, então isso seria redundante.
 