const { Organizador} = require('../models/organizador');
const { empresa } = require('../models/empresa');
const { servidor_publico } = require('../models/servidorPublico');
class OrganizadorController {

  // POST /organizadores
  async store(req, res) {
    try {
      const { tipo, nome_publico, descricao, empresa_cnpj, servidor_cpf } = req.body;

      if (tipo === 'EMPRESA' && !empresa_cnpj) {
        return res.status(400).json({ error: 'empresa_cnpj é obrigatório para EMPRESA' });
      }

      if (tipo === 'SERVIDOR_PUBLICO' && !servidor_cpf) {
        return res.status(400).json({ error: 'servidor_cpf é obrigatório para SERVIDOR_PUBLICO' });
      }

      const organizador = await Organizador.create({
        tipo,
        nome_publico,
        descricao,
        empresa_cnpj,
        servidor_cpf
      });

      return res.status(201).json(organizador);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /organizadores
  async index(req, res) {
    try {
      const organizadores = await Organizador.findAll({
        include: [
          { model: empresa, attributes: ['CNPJ', 'nome'] },
          { model: servidor_publico, attributes: ['CPF', 'nome'] }
        ]
      });

      return res.json(organizadores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /organizadores/:id
  async show(req, res) {
    try {
      const { id } = req.params;

      const organizador = await Organizador.findByPk(id, {
        include: [
          { model: empresa, attributes: ['CNPJ', 'nome'] },
          { model: servidor_publico, attributes: ['CPF', 'nome'] }
        ]
      });

      if (!organizador) {
        return res.status(404).json({ error: 'Organizador não encontrado' });
      }

      return res.json(organizador);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // PUT /organizadores/:id
  async update(req, res) {
    try {
      const { id } = req.params;

      const organizador = await Organizador.findByPk(id);

      if (!organizador) {
        return res.status(404).json({ error: 'Organizador não encontrado' });
      }

      await organizador.update(req.body);

      return res.json(organizador);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE /organizadores/:id
  async delete(req, res) {
    try {
      const { id } = req.params;

      const organizador = await Organizador.findByPk(id);

      if (!organizador) {
        return res.status(404).json({ error: 'Organizador não encontrado' });
      }

      await organizador.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrganizadorController();
