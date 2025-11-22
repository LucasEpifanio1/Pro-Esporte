// src/routes/index.js
const express = require('express');
const UserController = require('../controllers/UserController');
const OrganizerController = require('../controllers/OrganizerController');
const EventController = require('../controllers/EventController');

const routes = express.Router();

// Rotas de usuários
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

// Rotas de organizadores
routes.post('/organizers', OrganizerController.store);
routes.get('/organizers', OrganizerController.index);

// Rotas de eventos
routes.post('/events', EventController.store);
routes.get('/events', EventController.index);

module.exports = routes;
