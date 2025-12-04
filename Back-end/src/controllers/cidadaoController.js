// Importa o model Cidadao
const cidadao = require('../models/cidadao');

module.exports = {
  async index(req, res) {
    const pessoas = await cidadao.findAll();
    res.json(pessoas);
  },

  async store(req, res) {
    const pessoa = await cidadao.create(req.body);
    res.json(pessoa);
  },
};
