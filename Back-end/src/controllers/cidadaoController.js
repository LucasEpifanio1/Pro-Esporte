
const cidadao = require('../models/cidadao');
//cria uma novo usuario
module.exports = {
  async post(req, res) {
    const pessoa = await cidadao.create(req.body);
    return res.status(201).json(pessoa);
  }
};
