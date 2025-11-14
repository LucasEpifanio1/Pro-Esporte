// src/database/index.js
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Organizer = require('../models/Organizer');
const Event = require('../models/Event');

const connection = new Sequelize(dbConfig);

User.init(connection);
Organizer.init(connection);
Event.init(connection);

Organizer.associate(connection.models);
Event.associate(connection.models);

module.exports = connection;
