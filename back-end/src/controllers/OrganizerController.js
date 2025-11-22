// src/controllers/UserController.js
const Organizer = require('../models/Organizer');

module.exports = {
  async store(req, res) {
    const { name, email, senha } = req.body;
    const organizers = await User.create({ id,name, email, cpf_cnpj, senha });
    return res.json(organizers);
  },

  async index(req, res) {
    const organizers = await Organizer.findAll();
    return res.json(organizers);
  }
};
