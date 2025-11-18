const express = require('express');
const routes = express.Router();

const PessoaFisicaController = require('../src/controllers/PessoaFisicaController');

// PESSOA FÍSICA
routes.get('/pessoafisica', PessoaFisicaController.index);
routes.post('/pessoafisica', PessoaFisicaController.store);
routes.put('/pessoafisica/:CPF', PessoaFisicaController.update);
routes.delete('/pessoafisica/:CPF', PessoaFisicaController.delete);


module.exports = routes;
