const Evento = require('../models/evento');
const Organizador = require('../models/organizador');

class EventoController {
  async post(req, res) {
    try {
      const {
        organizador_id,
        titulo,
        modalidade,
        local,
        data,
        horario,
        vagas,
        descricao,
        imagem
      } = req.body;

      if (!organizador_id) {
        return res.status(400).json({ error: 'organizador_id é obrigatório' });
      }

      const organizador = await Organizador.findByPk(organizador_id);

      if (!organizador) {
        return res.status(400).json({ error: 'Organizador inválido' });
      }

      const evento = await Evento.create({
        organizador_id,
        titulo,
        modalidade,
        local,
        data,
        horario,
        vagas,
        descricao,
        imagem
      });

      return res.status(201).json(evento);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EventoController();
