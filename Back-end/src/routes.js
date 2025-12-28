const express = require("express");
const routes = express.Router();

const cidadaoController = require("./controllers/cidadaoController");
const empresaController = require("./controllers/empresaController");
const servidorPublicoController = require("./controllers/servidorPublicoController");
const eventoController = require("./controllers/eventoController");

// cidadao
routes.post("/cidadao", cidadaoController.store);
routes.get("/cidadao", cidadaoController.index);
///empresa
routes.post("/empresa", empresaController.store);
///servidorpublico
routes.post("/servidorPublico", servidorPublicoController.store);
// Eventos
routes.post("/evento", eventoController.store);

module.exports = routes;
