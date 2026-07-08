const RotinaTreino = require('../models/treino');
const Seleciona = require('../models/seleciona');
const sequelize = require('../database/index');
const { generateRandomId5, generateRandomId6 } = require('../config/idGenerator')
const TreinoService = require('../services/treinoService');
const Exercicio = require('../models/exercicio');

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
        const { id_cidadao } = req.params;

        // TENTATIVA DE RESGATE DOS DADOS
        let dadosDaFicha = req.body.fichaTreino;

        if (!dadosDaFicha && req.body.objetivo) {
            console.log("Aviso: O front-end mandou os dados soltos (sem a chave fichaTreino). Usando req.body direto.");
            dadosDaFicha = req.body;
        }

        if (!id_cidadao || !dadosDaFicha) {
            console.error("ERRO: ID ou Ficha faltando mesmo após tentativa de resgate.");
            return res.status(400).json({ error: 'Dados incompletos. Verifique o console do servidor.' });
        }

        const transaction = await sequelize.transaction();

        try {
            // 1. Salvar Equipamentos (igual antes)
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

            // 2. O SERVIDOR É A FONTE ÚNICA DA VERDADE:
            // verifica se o cidadão já tem uma rotina salva
            let rotina = await RotinaTreino.findOne({
                where: { ID_Cidadao: id_cidadao },
                transaction
            });

            const dadosRotina = {
                descricao: dadosDaFicha.descricao || `${dadosDaFicha.objetivo} - ${dadosDaFicha.divisao}`,
                nivel: MAPA_NIVEIS[dadosDaFicha.perfilIdentificado] || 1,
                perfil_identificado: dadosDaFicha.perfilIdentificado,
                objetivo: dadosDaFicha.objetivo,
                divisao: dadosDaFicha.divisao,
                instrucoes_gerais: dadosDaFicha.instrucoesGerais || "Sem instruções."
            };

            if (rotina) {
                // Já existe rotina: apaga os exercícios antigos e atualiza os dados da rotina existente
                console.log(`Rotina ${rotina.id_rotina_treino} já existia para o cidadão ${id_cidadao}. Substituindo.`);

                await Seleciona.destroy({
                    where: { id_rotina_treino: rotina.id_rotina_treino },
                    transaction
                });

                await rotina.update(dadosRotina, { transaction });
            } else {
                // Não existe: gera um ID novo e cria a rotina
                let novoIdRotina;
                let idExistente;
                do {
                    novoIdRotina = generateRandomId5();
                    idExistente = await RotinaTreino.findByPk(novoIdRotina);
                } while (idExistente);

                rotina = await RotinaTreino.create({
                    id_rotina_treino: novoIdRotina,
                    ID_Cidadao: id_cidadao,
                    ...dadosRotina
                }, { transaction });
            }

            // 3. Salvar Exercícios da rotina (nova ou atualizada)
            const exerciciosParaSalvar = [];
            let contadorOrdem = 1;

            if (dadosDaFicha.dias) {
                for (const dia of dadosDaFicha.dias) {
                    if (dia.exercicios) {
                        for (const ex of dia.exercicios) {

                            let idUnicoParaEstaLinha;
                            let idJaExiste;
                            do {
                                idUnicoParaEstaLinha = generateRandomId6();
                                idJaExiste = await Seleciona.findByPk(idUnicoParaEstaLinha);
                            } while (idJaExiste);

                            exerciciosParaSalvar.push({
                                id_seleciona: idUnicoParaEstaLinha,
                                id_rotina_treino: rotina.id_rotina_treino,
                                id_exercicio: ex.id_exercicio,
                                dia: dia.nome,
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
            console.log(`SUCESSO! Rotina ${rotina.id_rotina_treino} salva.`);

            return res.status(201).json({
                message: 'Treino salvo com sucesso!',
                id_rotina: rotina.id_rotina_treino
            });

        } catch (error) {
            if (transaction) await transaction.rollback();
            console.error('ERRO FATAL AO SALVAR:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    // função adicionada pra nova rota, mas não está funcionando, retorna "error": "Seleciona is not associated to RotinaTreino!" pelo postman
    async show(req, res) {
        const { id_cidadao } = req.params;

        try {
            const rotina = await RotinaTreino.findOne({
                where: { ID_Cidadao: id_cidadao },
                include: [{
                    model: Seleciona,
                    as: 'exercicios',
                    required: false,
                    include: [{ model: Exercicio, as: 'exercicio' }],
                    order: [['ordem_execucao', 'ASC']]
                }]
            });

            if (!rotina) {
                return res.status(404).json({ error: 'Rotina não encontrada' });
            }

            const params = TreinoService.obterParametrosPorObjetivo(rotina.objetivo);

            // Reagrupa a lista plana de Seleciona em dias[].exercicios[],
            // no mesmo formato que o app espera (TelaRotinaTreino.js)
            const diasMap = new Map();

            for (const item of rotina.exercicios) {
                const nomeDia = item.dia || 'Dia Único';

                if (!diasMap.has(nomeDia)) {
                    diasMap.set(nomeDia, { nome: nomeDia, exercicios: [] });
                }

                diasMap.get(nomeDia).exercicios.push({
                    id_exercicio: item.id_exercicio,
                    nome: item.exercicio?.nome || 'Exercício',
                    descricao: item.exercicio?.descricao || '',
                    series: item.series,
                    reps: item.repeticoes_ou_tempo,
                    descanso: params.descanso
                });
            }

            const fichaTreino = {
                perfilIdentificado: rotina.perfil_identificado,
                objetivo: rotina.objetivo,
                divisao: rotina.divisao,
                descricao: rotina.descricao,
                instrucoesGerais: rotina.instrucoes_gerais,
                dias: Array.from(diasMap.values())
            };

            return res.status(200).json(fichaTreino);
        } catch (error) {
            console.error('ERRO AO BUSCAR ROTINA:', error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TreinoController();
