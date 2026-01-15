const express = require("express");
const routes = express.Router();

const cidadaoController = require("./controllers/cidadaoController");
const empresaController = require("./controllers/empresaController");
const servidorPublicoController = require("./controllers/servidorPublicoController");
const eventoController = require("./controllers/eventoController");
const treinoController = require("./controllers/treinoController");
const treinoController = require("./controllers/treinoController");

// Cidadao
routes.post("/cidadao", cidadaoController.store || cidadaoController.post);
routes.get("/cidadao", cidadaoController.index);

// Empresa
routes.post("/empresa", empresaController.store || empresaController.post);

// Servidor Público
routes.post("/servidorPublico", servidorPublicoController.store || servidorPublicoController.post);

// Eventos
routes.post("/evento", eventoController.post);
routes.get("/eventos", eventoController.index);

// Treinos (Módulo Street Workout)
routes.post("/treino/gerar", treinoController.gerar);
//Treinos
routes.post("/treino/gerar", treinoController.gerar);

module.exports = routes;
