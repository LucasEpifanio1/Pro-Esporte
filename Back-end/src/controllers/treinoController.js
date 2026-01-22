const RotinaTreino = require('../models/treino');
const Seleciona = require('../models/seleciona');
const sequelize = require('../database/index');
const { generateRandomId5, generateRandomId6 } = require('../config/idGenerator')
const TreinoService = require('../services/treinoService');

// Mapa manual para garantir que o texto do front vire o ID correto do banco
const MAPA_EQUIPAMENTOS = {
    "Barra fixa/barra de porta": 1,
    "Barra paralela": 2, 
    "Paralete baixo/médio": 3,
    "Argolas Olímpicas": 4,
    "Equipamentos da praça da prefeitura": 5,
    "Chão/parede/banco etc": 6
};

const MAPA_NIVEIS = {
    'Iniciante Zero': 1,
    'Iniciante Bronze': 2,
    'Iniciante Prata': 3,
    'Intermediário': 4,
    'Avançado (Seu Perfil)': 5,
    'Elite': 6
};

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
        // --- ÁREA DE DEBUG (OLHE O TERMINAL APÓS CLICAR) ---
        console.log('--- INÍCIO DO SALVAMENTO ---');
        console.log('Parâmetros URL:', req.params);
        // O segredo está aqui: vamos ver o JSON real formatado
        console.log('Conteúdo do Body:', JSON.stringify(req.body, null, 2)); 
        // ----------------------------------------------------

        const { id_cidadao } = req.params;
        
        // TENTATIVA DE RESGATE DOS DADOS
        // 1. Tenta pegar dentro da chave 'fichaTreino'
        let dadosDaFicha = req.body.fichaTreino;

        // 2. Se não achou, verifica se o body JÁ É a ficha (caso o front tenha mandado direto)
        if (!dadosDaFicha && req.body.objetivo) {
            console.log("Aviso: O front-end mandou os dados soltos (sem a chave fichaTreino). Usando req.body direto.");
            dadosDaFicha = req.body;
        }

        // Validação final
        if (!id_cidadao || !dadosDaFicha) {
            console.error("ERRO: ID ou Ficha faltando mesmo após tentativa de resgate.");
            return res.status(400).json({ error: 'Dados incompletos. Verifique o console do servidor.' });
        }

        const transaction = await sequelize.transaction();

        try {
            let novoIdRotina;
            let idExistente;
            do {
                novoIdRotina = generateRandomId5();
                idExistente = await RotinaTreino.findByPk(novoIdRotina);
            } while (idExistente);

            // 2. Salvar Equipamentos
            // Nota: use dadosDaFicha.equipamentos em vez de fichaTreino.equipamentos
            if (dadosDaFicha.equipamentos && dadosDaFicha.equipamentos.length > 0) {
                const equipamentosIds = dadosDaFicha.equipamentos
                    .map(nome => MAPA_EQUIPAMENTOS[nome])
                    .filter(id => id !== undefined);

                for (const id_equip of equipamentosIds) {
                    await sequelize.query(
                        `INSERT INTO Cidadao_Equipamento (ID_Cidadao, id_equipamento) 
                         VALUES (:cid, :eq) 
                         ON DUPLICATE KEY UPDATE id_equipamento=id_equipamento`,
                        { replacements: { cid: id_cidadao, eq: id_equip }, transaction }
                    );
                }
            }

            // 3. Salvar a Rotina
            const novaRotina = await RotinaTreino.create({
                id_rotina_treino: novoIdRotina,
                ID_Cidadao: id_cidadao,
                descricao: dadosDaFicha.descricao || `${dadosDaFicha.objetivo} - ${dadosDaFicha.divisao}`,
                nivel: MAPA_NIVEIS[dadosDaFicha.perfilIdentificado] || 1,
                perfil_identificado: dadosDaFicha.perfilIdentificado,
                objetivo: dadosDaFicha.objetivo,
                divisao: dadosDaFicha.divisao,
                instrucoes_gerais: dadosDaFicha.instrucoesGerais || "Sem instruções."
            }, { transaction });

            // 4. Salvar Exercícios
            const exerciciosParaSalvar = [];
            let contadorOrdem = 1;

            if (dadosDaFicha.dias) {
                for (const dia of dadosDaFicha.dias) {
                    if (dia.exercicios) {
                        for (const ex of dia.exercicios) {
                            
                            // O SEGREDO: Gerar um ID NOVO para CADA exercício dentro do loop
                            let idUnicoParaEstaLinha;
                            let idJaExiste;
                            do {
                                idUnicoParaEstaLinha = generateRandomId6();
                                // IMPORTANTE: Verificar no model CERTO (Seleciona)
                                idJaExiste = await Seleciona.findByPk(idUnicoParaEstaLinha);
                            } while (idJaExiste);

                            exerciciosParaSalvar.push({
                                id_seleciona: idUnicoParaEstaLinha, // ID único para esta linha específica
                                id_rotina_treino: novaRotina.id_rotina_treino,
                                id_exercicio: ex.id_exercicio,
                                series: String(ex.series || "3"),
                                repeticoes_ou_tempo: String(ex.repeticoes || ex.tempo || "Falha"),
                                ordem_execucao: contadorOrdem++
                            });
                        }
                    }
                }
            }

            if (exerciciosParaSalvar.length > 0) {
                await Seleciona.bulkCreate(exerciciosParaSalvar, { transaction });
            }

            await transaction.commit();
            console.log(`SUCESSO! Rotina ${novoIdRotina} criada.`);

            return res.status(201).json({
                message: 'Treino salvo com sucesso!',
                id_rotina: novaRotina.id_rotina_treino
            });

        } catch (error) {
            if (transaction) await transaction.rollback();
            console.error('ERRO FATAL AO SALVAR:', error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TreinoController();
