const Evento = require("../models/evento");
const Empresa = require("../models/empresa");
const Servidor = require("../models/servidorPublico");
const { generateRandomId8Dig } = require("../config/idGenerator");

module.exports = {
  async store(req, res) {
    try {
      const {
        ID_Evento,
        Nome,
        Data,
        Categoria,
        CEP,
        Rua,
        Bairro,
        Numero,
        tipoUsuario,
        email,
      } = req.body;
      let identificadorEncontrado = null;

      // Precisamos preparar os dados para o Sequelize
      let dadosEvento = {
        ID_Evento,
        Nome,
        Data,
        Categoria,
        CEP,
        Rua,
        Bairro,
        Numero,
        FK_Empresa: null,
        FK_Servidor: null,
      };

      if (tipoUsuario === "empresa") {
        const empresaEncontrada = await Empresa.findOne({
          where: { email: email },
        });
        if (empresaEncontrada) {
          identificadorEncontrado = empresaEncontrada.CNPJ;
          dadosEvento.FK_Empresa = identificadorEncontrado;
        }
      } else if (tipoUsuario === "servidor") {
        const servidorEncontrado = await Servidor.findOne({
          where: { email: email },
        });
        if (servidorEncontrado) {
          identificadorEncontrado = servidorEncontrado.CPF;
          dadosEvento.FK_Servidor = identificadorEncontrado;
        }
      }
      if (!identificadorEncontrado) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado para este e-mail." });
      }

      let novoId;
      let idExistente;
      do {
        novoId = generateRandomId8Dig();
        idExistente = await Evento.findByPk(novoId);
      } while (idExistente);
      dadosEvento.ID_Evento = novoId;
      console.log("Dados enviados para o banco: ", dadosEvento);
      const novoEvento = await Evento.create(dadosEvento);
      return res.status(201).json(novoEvento);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ error: "Erro interno ao criar evento." });
    }
  },

  async index(req, res) {
    try {
      const eventos = await Evento.findAll({
        include: [
          {
            model: Empresa,
            as: "empresa",
            attributes: ["nome", "email", "CNPJ"],
          },
          {
            model: Servidor,
            as: "servidor",
            attributes: ["nome", "email", "CPF"],
          },
        ],
      });
      return res.json(eventos);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar eventos." });
    }
  },
};
