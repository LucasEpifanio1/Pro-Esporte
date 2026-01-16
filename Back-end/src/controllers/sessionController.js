const Cidadao = require('../models/cidadao');
const Empresa = require('../models/empresa');
const ServidorPublico = require('../models/servidorPublico');

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;

    let usuario = null;
    let tipoUsuario = null;
    let payloadUsuario = null;

    // Cidadão
    usuario = await Cidadao.findOne({ where: { email, senha } });
    if (usuario) {
      tipoUsuario = 'cidadao';
      payloadUsuario = {
        identificador: usuario.ID_Cidadao,
        nome: usuario.nome,
        tipo: tipoUsuario,
        respondeuQuestionario: usuario.respondeuQuestionario
      };
    }

    // Empresa
    if (!usuario) {
      usuario = await Empresa.findOne({ where: { email, senha } });
      if (usuario) {
        tipoUsuario = 'empresa';
        payloadUsuario = {
        identificador: usuario.cnpj,
        nome: usuario.nome,
        tipo: tipoUsuario
      };
      }
    }

    // Servidor Público
    if (!usuario) {
      usuario = await ServidorPublico.findOne({ where: { email, senha } });
      if (usuario) {
        tipoUsuario = 'servidor_publico';
        payloadUsuario = {
        identificador: usuario.CPF,
        nome: usuario.nome,
        tipo: tipoUsuario
      };
      }
    }

    // Não encontrado em nenhuma tabela
    if (!payloadUsuario) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    return res.json(payloadUsuario);
  }
};
