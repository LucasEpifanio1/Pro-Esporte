const Participa = require("../models/participa");
const Evento = require("../models/evento");

class ParticipacaoController {
  async store(req, res) {
    try {
      const { ID_Cidadao, ID_Evento } = req.body;

      if (!ID_Cidadao || !ID_Evento) {
        return res.status(400).json({ error: 'Dados insuficientes para inscrição' });
      }

      // Verificar se o evento existe e tem vagas
      const evento = await Evento.findByPk(ID_Evento);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      // Verificar se já está inscrito
      const jaInscrito = await Participa.findOne({
        where: { ID_Cidadao, ID_Evento }
      });

      if (jaInscrito) {
        return res.status(400).json({ error: 'Você já está inscrito neste evento' });
      }

      // Criar inscrição
      await Participa.create({ ID_Cidadao, ID_Evento });

      return res.status(201).json({ message: 'Inscrição realizada com sucesso!' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao realizar inscrição' });
    }
  }

  async index(req, res) {
    try {
      const { id_cidadao } = req.params;
      const participacoes = await Participa.findAll({
        where: { ID_Cidadao: id_cidadao },
        include: [{ model: Evento, as: 'evento' }]
      });
      return res.json(participacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar inscrições' });
    }
  }
}

module.exports = new ParticipacaoController();
