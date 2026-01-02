const Evento = require('../models/evento');
const Organizador = require('../models/organizador');

class EventoController {

  async store(req, res) {
    try {
      const {
        organizador_id,
        titulo,
        modalidade,
        local,
        data,
        horario,
        vagas,
        descricao
      } = req.body;

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
        descricao
      });

      return res.status(201).json(evento);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const eventos = await Evento.findAll({
        include: {
          model: Organizador,
          attributes: ['id', 'nome_publico', 'tipo']
        }
      });

      return res.json(eventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findByPk(id, {
        include: {
          model: Organizador,
          attributes: ['id', 'nome_publico', 'tipo']
        }
      });

      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      return res.json(evento);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findByPk(id);

      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      await evento.update(req.body);

      return res.json(evento);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findByPk(id);

      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      await evento.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EventoController();
