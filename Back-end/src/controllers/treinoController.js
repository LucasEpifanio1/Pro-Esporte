const TreinoService = require('../services/treinoService');

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
}

module.exports = new TreinoController();
