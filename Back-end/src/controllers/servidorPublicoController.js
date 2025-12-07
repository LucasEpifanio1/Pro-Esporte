// Importa o model PessoaFisica, que representa a tabela 'PessoaFisicas' no banco de dados
const servidor = require('../models/servidorPublico');

module.exports = {
  // Função para listar todas as pessoas
  async index(req, res) {
    // Busca todas as pessoas no banco usando o model
    const pessoas = await servidor.findAll();
    // Retorna a lista de pessoas em formato JSON para o usuário
    res.json(pessoas);
  },

  // Função para criar uma nova pessoa
  async store(req, res) {
    // Cria uma nova pessoa usando os dados enviados no corpo da requisição (req.body)
    const pessoa = await servidor.create(req.body);
    // Retorna a pessoa criada em formato JSON
    res.json(pessoa);
  },
};