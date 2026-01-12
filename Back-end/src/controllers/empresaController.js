const empresa = require('../models/empresa');

module.exports = {
  async post(req, res) {
    try {
      const pessoa = await empresa.create(req.body);
      return res.status(201).json(pessoa);
    } catch (err) {
      console.error("Erro ao criar pessoa jurídica, verifica o se o req.bory está certo ou se não está repetindo o mesmo cnpj", err);
      return res.status(500).json({ error: "Erro ao criar pessoa jurídica" });
    }
  }
};