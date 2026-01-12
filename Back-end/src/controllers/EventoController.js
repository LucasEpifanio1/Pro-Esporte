const Evento = require('../models/evento');

class EventoController {
  async post(req, res) {
    try {
      const {
        titulo,
        modalidade,
        local,
        data,
        horario,
        vagas,
        descricao,
        imagem
      } = req.body;

      if (!titulo || !modalidade || !local || !data || !horario || !vagas) {
        return res.status(400).json({
          error: 'Preencha todos os campos obrigatórios'
        });
      }

      const evento = await Evento.create({
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
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar evento' });
    }
  }
}



module.exports = new EventoController();
