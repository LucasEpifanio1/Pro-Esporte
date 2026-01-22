const TreinoService = require('../services/treinoService');
const Treino = require('../models/treino');

class TreinoController {
    async gerar(req, res) {
        try {
            const { respostas, objetivo, diasDisponiveis, equipamentos } = req.body;

            // Validação básica
            if (!respostas || !objetivo || !diasDisponiveis) {
                return res.status(400).json({ 
                    error: 'Faltam parâmetros obrigatórios.',
                    required: ['respostas', 'objetivo', 'diasDisponiveis'],
                    received: Object.keys(req.body)
                });
            }

            // respostas esperadas: flexaoInclinada, flexaoPadrao, barraAustraliana, barraFixa, agachamentoSofa, agachamentoPadrao, prancha, abdominalSupra

            const fichaTreino = await TreinoService.gerarTreino({
                respostas,
                objetivo,
                diasDisponiveis,
                equipamentos: equipamentos || []
            });

            return res.json(fichaTreino);
        } catch (error) {
            console.error('Erro no TreinoController:', error);
            return res.status(500).json({ error: 'Erro interno ao gerar a ficha de treino.' });
        }
    }

    async salvar(req, res) {
        try {
            const { id_cidadao } = req.params;
            const { fichaTreino } = req.body;

            if (!id_cidadao || !fichaTreino) {
                return res.status(400).json({ 
                    error: 'Faltam parâmetros obrigatórios: id_cidadao e fichaTreino'
                });
            }

            const treino = await Treino.create({
                id_cidadao,
                perfil_identificado: fichaTreino.perfilIdentificado,
                objetivo: fichaTreino.objetivo,
                divisao: fichaTreino.divisao,
                descricao: fichaTreino.descricao,
                instrucoes_gerais: fichaTreino.instrucoesGerais,
                dados_treino: fichaTreino
            });

            return res.status(201).json({
                message: 'Treino salvo com sucesso!',
                treino
            });
        } catch (error) {
            console.error('Erro ao salvar treino:', error);
            return res.status(500).json({ error: 'Erro ao salvar treino' });
        }
    }
}

module.exports = new TreinoController();
