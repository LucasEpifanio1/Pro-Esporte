const empresa = require('../models/empresa');
module.exports = {
  async store(req, res) {
    try {
      const pessoa = await empresa.create(req.body);
      return res.status(201).json(pessoa);
    } catch (err) {
      console.error("Erro ao criar pessoa jurídica:", err);
      return res.status(500).json({ error: "Erro ao criar pessoa jurídica" });
    }
  }
};