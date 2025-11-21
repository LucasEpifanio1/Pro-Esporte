const PessoaFisica = require('../models/pessoaFisica');

module.exports = {
  async index(req, res) {
    const pessoas = await PessoaFisica.findAll();
    res.json(pessoas);
  },

  async store(req, res) {
    const pessoa = await PessoaFisica.create(req.body);
    res.json(pessoa);
  },

  async update(req, res) {
    const { CPF } = req.params;
    const pessoa = await PessoaFisica.findByPk(CPF);

    if (!pessoa) {
      return res.json({ erro: "Pessoa não encontrada" });
    }

    await pessoa.update(req.body);
    res.json(pessoa);
  },

  async delete(req, res) {
    const { CPF } = req.params;
    const pessoa = await PessoaFisica.findByPk(CPF);

    if (!pessoa) {
      return res.json({ erro: "Pessoa não encontrada" });
    }

    await pessoa.destroy();
    res.json({ mensagem: "Pessoa removida" });
  }
};
