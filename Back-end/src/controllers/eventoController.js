const Evento = require("../models/evento");

module.exports = {
  async store(req, res) {
    try {
      const {
        Nome,
        Data,
        Categoria,
        CEP,
        Rua,
        Bairro,
        Numero,
        tipoUsuario,
        identificador,
      } = req.body;

      // Precisamos preparar os dados para o Sequelize
      let dadosEvento = {
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

      // TODO: Usar if-else para preencher a FK correta com o 'identificador'
      if (tipoUsuario === "empresa") {
        dadosEvento.FK_Empresa = identificador;
      } else if (tipoUsuario === "servidor") {
        dadosEvento.FK_Servidor = identificador;
      }

      const novoEvento = await Evento.create(dadosEvento);
      return res.status(201).json(novoEvento);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ error: "Erro interno ao criar evento." });
    }
  },
};
