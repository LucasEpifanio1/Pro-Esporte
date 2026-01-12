
const servidor = require('../models/servidorPublico');
module.exports = {
  // Função para criar uma nova pessoa
  async post(req, res) {
    const pessoa = await servidor.create(req.body);
    res.json(pessoa);
  },
};