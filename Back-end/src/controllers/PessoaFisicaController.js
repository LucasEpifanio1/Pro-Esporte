// Importa o model PessoaFisica, que representa a tabela 'PessoaFisicas' no banco de dados
const PessoaFisica = require('../models/pessoaFisica');

module.exports = {
  // Função para listar todas as pessoas
  async index(req, res) {
    // Busca todas as pessoas no banco usando o model
    const pessoas = await PessoaFisica.findAll();
    // Retorna a lista de pessoas em formato JSON para o usuário
    res.json(pessoas);
  },

  // Função para criar uma nova pessoa
  async store(req, res) {
    // Cria uma nova pessoa usando os dados enviados no corpo da requisição (req.body)
    const pessoa = await PessoaFisica.create(req.body);
    // Retorna a pessoa criada em formato JSON
    res.json(pessoa);
  },

  // Função para atualizar uma pessoa existente
  async update(req, res) {
    // Pega o CPF da pessoa que será atualizada a partir dos parâmetros da rota
    const { CPF } = req.params;
    // Busca a pessoa pelo CPF no banco
    const pessoa = await PessoaFisica.findByPk(CPF);

    // Se a pessoa não existir, retorna um erro
    if (!pessoa) {
      return res.json({ erro: "Pessoa não encontrada" });
    }

    // Atualiza os dados da pessoa com os dados enviados no corpo da requisição
    await pessoa.update(req.body);
    // Retorna a pessoa atualizada
    res.json(pessoa);
  },

  // Função para deletar uma pessoa
  async delete(req, res) {
    // Pega o CPF da pessoa que será removida a partir dos parâmetros da rota
    const { CPF } = req.params;
    // Busca a pessoa pelo CPF no banco
    const pessoa = await PessoaFisica.findByPk(CPF);

    // Se a pessoa não existir, retorna um erro
    if (!pessoa) {
      return res.json({ erro: "Pessoa não encontrada" });
    }

    // Remove a pessoa do banco
    await pessoa.destroy();
    // Retorna uma mensagem de confirmação
    res.json({ mensagem: "Pessoa removida" });
  }
};
