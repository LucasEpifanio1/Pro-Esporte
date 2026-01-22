const RotinaTreino = require('../models/treino');
const seleciona = require('../models/seleciona');
const sequelize = require('../database/index');
const { generateRandomId5 } = require('../config/idGenerator')
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
        console.log("Parâmetros recebidos:", req.params);
        console.log("Corpo da ficha recebido:", req.body ? "Sim" : "Não");

        const { ID_Cidadao } = req.params;
        const { fichaTreino } = req.body;

        if (!ID_Cidadao || !fichaTreino) {
            console.error("Erro: Dados faltando!");
            return res.status(400).json({ error: 'Dados incompletos. Faltam o ID_Cidadao e ficha de treino' });
        }

        const transaction = await sequelize.transaction();
        
        try {
            console.log("Iniciando processo de salvamento...");

            let novoIdRotina;
            let idExistente;
            do {
                novoIdRotina = generateRandomId5();
                idExistente = await RotinaTreino.findByPk(novoIdRotina);
            } while (idExistente);

            console.log("Novo ID da Rotina:", novoIdRotina);
            
            /*Salvar Equipamentos do Cidadão (Cidadao_Equipamento)
            O front manda os nomes e aqui convertemos para IDs*/
            if (fichaTreino.equipamentos && fichaTreino.equipamentos.length > 0) {
                // Remove equipamentos antigos desse usuário para não duplicar
                await sequelize.query(`DELETE FROM Cidadao_Equipamento WHERE ID_Cidadao = ${ID_Cidadao}`, { transaction });

                const equipamentosIds = fichaTreino.equipamentos
                    .map(nome => MAPA_EQUIPAMENTOS[nome]) // Converte nome -> ID
                    .filter(id => id !== undefined); // Remove nulos caso venha algo estranho

                // Inserção manual na tabela N:N
                for (const id_equip of equipamentosIds) {
                    // Aqui faremos direto via query para agilizar por não ter o model CidadaoEquipamento
                    await sequelize.query(
                        `INSERT INTO Cidadao_Equipamento (ID_Cidadao, id_equipamento) VALUES (:cid, :eq) ON DUPLICATE KEY UPDATE id_equipamento=id_equipamento`,
                        { 
                            replacements: { cid: ID_Cidadao, eq: id_equip },
                            transaction 
                        }
                    );
                }
            }

            //Salvar a Rotina (Cabeçalho)
            const nivelCalculado = MAPA_NIVEIS[fichaTreino.perfilIdentificado] || 1;

            const novaRotina = await RotinaTreino.create({
                id_rotina_treino: novoIdRotina, // ID gerado manualmente
                ID_Cidadao: ID_Cidadao,
                descricao: fichaTreino.descricao || `${fichaTreino.objetivo} - ${fichaTreino.divisao}`,
                nivel: nivelCalculado,
                perfil_identificado: fichaTreino.perfilIdentificado,
                objetivo: fichaTreino.objetivo,
                divisao: fichaTreino.divisao,
                instrucoes_gerais: fichaTreino.instrucoesGerais || "Siga a ordem dos exercícios e respeite o tempo de descanso."
            }, { transaction });;

            //  Salvar os Exercícios (Tabela Seleciona)
            const exerciciosParaSalvar = [];
            let contadorOrdem = 1;

            // Percorre os Dias (A, B, C...)
            if (fichaTreino.dias) {
                for (const dia of fichaTreino.dias) {
                    if (dia.exercicios) {
                        for (const ex of dia.exercicios) {
                            exerciciosParaSalvar.push({
                                id_rotina_treino: novaRotina.id_rotina_treino,
                                id_exercicio: ex.id_exercicio, // O ID que veio do banco no gerar()
                                series: String(ex.series), // ex: "3"
                                repeticoes_ou_tempo: String(ex.repeticoes || ex.tempo), // Pega o que tiver preenchido
                                ordem_execucao: contadorOrdem++
                            });
                        }
                    }
                }
            }

            // Bulk create é mais rápido que fazer um insert por vez
            if (exerciciosParaSalvar.length > 0) {
                await seleciona.bulkCreate(exerciciosParaSalvar, { transaction });
            }

            await transaction.commit(); // Confirma tudo no banco

            return res.status(201).json({
                message: 'Treino e equipamentos salvos com sucesso!',
                id_rotina: novaRotina.id_rotina_treino
            });

        } catch (error) {
            await transaction.rollback(); // Se der erro, desfaz tudo
            console.error('Erro ao salvar treino:', error);
            return res.status(500).json({ error: 'Erro ao salvar rotina no banco.' });
        }
    }
}

module.exports = new TreinoController();
