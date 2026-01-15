const { Op } = require("sequelize");
const Evento = require("../models/evento");
const Empresa = require("../models/empresa");
const ServidorPublico = require("../models/servidorPublico");
const { generateRandomId8Dig } = require("../config/idGenerator");

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
        imagem,
        FK_Empresa,
        FK_Servidor
      } = req.body;

      if (!titulo || !modalidade || !local || !data || !horario || !vagas) {
        return res.status(400).json({
          error: 'Preencha todos os campos obrigatórios'
        });
      }

      // Lógica de geração de ID único de 8 dígitos
      let novoId;
      let idExistente;
      do {
        novoId = generateRandomId8Dig();
        idExistente = await Evento.findByPk(novoId);
      } while (idExistente);

      const evento = await Evento.create({
        ID_Evento: novoId,
        titulo,
        modalidade,
        local,
        data,
        horario,
        vagas,
        descricao,
        imagem,
        FK_Empresa,
        FK_Servidor
      });

      return res.status(201).json(evento);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar evento' });
    }
  }

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

      const eventos = await Evento.findAll({ 
        where,
        include: [
          { 
            model: Empresa, 
            as: 'empresa',
            attributes: ['nome', 'email', 'cnpj'] 
          },
          { 
            model: ServidorPublico, 
            as: 'servidor',
            attributes: ['nome', 'email'] // CPF escondido conforme solicitado
          }
        ]
      });

      return res.status(200).json(eventos);
    } catch (error) {
      console.error("Erro ao buscar eventos: ", error);
      return res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const evento = await Evento.findByPk(id, {
        include: [
          { model: Empresa, as: 'empresa', attributes: ['nome', 'email', 'cnpj'] },
          { model: ServidorPublico, as: 'servidor', attributes: ['nome', 'email'] }
        ]
      });

      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      return res.json(evento);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar detalhes do evento' });
    }
  }
}

module.exports = new EventoController();
