const { Op } = require("sequelize");
const Evento = require("../models/evento");

class EventoController {
  async post(req, res) {
    try {
      const {
        id_evento,
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
        id_evento,
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

/// para sair a lista do usuario;
  async index(req, res) {
    try {
      const { modalidade, turno, local } = req.query;

      const where = {};

      if (modalidade && modalidade !== 'todos') {
        where.modalidade = modalidade;
      }

      if (local && local !== 'todos') {
        where.local = local;
      }

      // turno baseado no horário
      if (turno && turno !== 'todos') {
        if (turno === 'manha') {
          where.horario = { [Op.between]: ['06:00', '11:59'] };
        }
        if (turno === 'tarde') {
          where.horario = { [Op.between]: ['12:00', '17:59'] };
        }
        if (turno === 'noite') {
          where.horario = { [Op.between]: ['18:00', '23:59'] };
        }
      }

      const eventos = await Evento.findAll({ where });

      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }
}






module.exports = new EventoController();
