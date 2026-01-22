const express = require("express");
const routes = express.Router();

const cidadaoController = require("./controllers/cidadaoController");
const empresaController = require("./controllers/empresaController");
const servidorPublicoController = require("./controllers/servidorPublicoController");
const eventoController = require("./controllers/eventoController");
const treinoController = require("./controllers/treinoController");
const SessionController = require("./controllers/sessionController");
const participacaoController = require("./controllers/participacaoController");

// Login
routes.post("/login", SessionController.store);

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
routes.get("/eventos/:id", eventoController.show);

// Participação em Eventos
routes.post("/participar", participacaoController.store);
routes.get("/participacoes/:id_cidadao", participacaoController.index);

// Treinos (Módulo Street Workout)
routes.post("/treino/gerar", treinoController.gerar);
routes.post("/treino/salvar/:id_cidadao", treinoController.salvar);

module.exports = routes;
