// Importa o model Cidadao
const cidadao = require('../models/cidadao');
const {generateRandomId} = require('../config/idGenerator');

module.exports = {
  async index(req, res) {
    const pessoas = await cidadao.findAll();
    res.json(pessoas);
  },

  async store(req, res) {
    try{
      let novoId;
      let idExistente;

      do{
        novoId = generateRandomId();
        idExistente = await cidadao.findByPk(novoId);
      } while (idExistente);
      const pessoa = await cidadao.create({
        ID_Cidadao: novoId,
        ...req.body
      });
      return res.status(201).json(pessoa);
    } catch(error){
      console.error("Erro ao criar cidadao: ", error);
      return res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
    }
  },
};
