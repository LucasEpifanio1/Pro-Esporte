const Organizador = require('../models/organizador');
const Empresa = require('../models/empresa');
const ServidorPublico = require('../models/servidorPublico');

class OrganizadorController {
  async post(req, res) {
    try {
      const { tipo, empresa_id, servidor_id, nome_publico } = req.body;

      if (!['EMPRESA', 'SERVIDOR_PUBLICO'].includes(tipo)) {
        return res.status(400).json({ error: 'tipo inválido' });
      }

      if (tipo === 'EMPRESA') {
        if (!empresa_id) {
          return res.status(400).json({ error: 'empresa_id é obrigatório para EMPRESA' });
        }
        const empresa = await Empresa.findByPk(empresa_id);
        if (!empresa) {
          return res.status(400).json({ error: 'Empresa não encontrada' });
        }
      }

      if (tipo === 'SERVIDOR_PUBLICO') {
        if (!servidor_id) {
          return res.status(400).json({ error: 'servidor_id é obrigatório para SERVIDOR_PUBLICO' });
        }
        const servidor = await ServidorPublico.findByPk(servidor_id);
        if (!servidor) {
          return res.status(400).json({ error: 'Servidor público não encontrado' });
        }
      }

      const organizador = await Organizador.create({
        tipo,
        nome_publico,
        empresa_id,
        servidor_id
      });

      return res.status(201).json(organizador);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}


module.exports = new OrganizadorController();
