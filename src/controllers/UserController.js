// src/controllers/UserController.js
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, email, senha } = req.body;
    const user = await User.create({ id,name, email, senha });
    return res.json(user);
  },

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
};
