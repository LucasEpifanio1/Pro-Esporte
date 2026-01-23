const Exercicio = require('../models/exercicio');

class TreinoService {
    /**
     * Perfis de Referência para o KNN
     * Ordem do vetor: [Flexão Inclinada, Flexão Padrão, Barra Australiana, Barra Fixa, Agachamento Sofá, Agachamento Padrão, Prancha (s), Abdominal Supra]
     */
    static perfisReferencia = [
        { id: 1, niveis: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Iniciante Zero' },
        { id: 2, niveis: [5, 0, 5, 0, 10, 5, 15, 10], label: 'Iniciante Bronze' },
        { id: 3, niveis: [15, 5, 10, 0, 20, 15, 30, 20], label: 'Iniciante Prata' },
        { id: 4, niveis: [20, 12, 15, 3, 20, 20, 45, 20], label: 'Intermediário' },
        { id: 5, niveis: [20, 20, 20, 8, 20, 20, 60, 20], label: 'Avançado' },
        { id: 6, niveis: [20, 20, 20, 15, 20, 20, 120, 20], label: 'Elite' }
    ];

    static calcularDistanciaEuclidiana(v1, v2) {
        return Math.sqrt(v1.reduce((acc, val, i) => acc + Math.pow(val - v2[i], 2), 0));
    }

    /**
     * Converte as respostas textuais do questionário em valores numéricos para o vetor KNN
     */
    static normalizarRespostas(respostas) {
        const mapaOpcoes = {
            "Não consigo fazer": 0,
            "1-5": 3,
            "5-10": 8,
            "10-20": 15,
            "+20": 25,
            "10-20 (s)": 15, // Para prancha
            "21-30": 25,
            "31-60": 45,
            "+60": 70
        };

        return [
            mapaOpcoes[respostas.flexaoInclinada] || 0,
            mapaOpcoes[respostas.flexaoPadrao] || 0,
            mapaOpcoes[respostas.barraAustraliana] || 0,
            mapaOpcoes[respostas.barraFixa] || 0,
            mapaOpcoes[respostas.agachamentoSofa] || 0,
            mapaOpcoes[respostas.agachamentoPadrao] || 0,
            mapaOpcoes[respostas.prancha] || 0,
            mapaOpcoes[respostas.abdominalSupra] || 0
        ];
    }

    static classificarNivel(respostas) {
        const vetorUsuario = this.normalizarRespostas(respostas);
        
        let menorDistancia = Infinity;
        let perfilMaisProximo = null;

        this.perfisReferencia.forEach(perfil => {
            const d = this.calcularDistanciaEuclidiana(vetorUsuario, perfil.niveis);
            if (d < menorDistancia) {
                menorDistancia = d;
                perfilMaisProximo = perfil;
            }
        });

        // Lógica de Força por Grupo (Escala 1 a 10 conforme o banco de dados)
        // Se o usuário não faz flexão padrão, o nível de empurrar deve ser baixo (1-2)
        const forcaEmpurrar = vetorUsuario[1] > 0 ? (vetorUsuario[1] > 10 ? 4 : 3) : (vetorUsuario[0] > 10 ? 2 : 1);
        const forcaPuxar = vetorUsuario[3] > 0 ? (vetorUsuario[3] > 5 ? 4 : 3) : (vetorUsuario[2] > 10 ? 2 : 1);
        const forcaPernas = vetorUsuario[5] > 15 ? 4 : (vetorUsuario[5] > 0 ? 3 : (vetorUsuario[4] > 10 ? 2 : 1));
        const forcaAbdomen = vetorUsuario[6] > 45 ? 4 : (vetorUsuario[6] > 20 ? 3 : 2);

        return {
            perfil: perfilMaisProximo,
            forcaGrupos: {
                'Empurrar': forcaEmpurrar,
                'Puxar': forcaPuxar,
                'Pernas': forcaPernas,
                'Abdômen': forcaAbdomen
            }
        };
    }

    static async gerarTreino(dados) {
        const { respostas, objetivo, diasDisponiveis, equipamentos } = dados;
        const classificacao = this.classificarNivel(respostas);
        const forca = classificacao.forcaGrupos;

        // 1. Determinar Divisão
        let divisao = '';
        let descricaoRotina = '';
        
        if (diasDisponiveis <= 2) {
            divisao = 'Full Body';
            descricaoRotina = 'Treine o corpo todo em uma única sessão. Ideal para iniciantes ou quem tem pouco tempo.';
        } else if (diasDisponiveis === 3) {
            divisao = 'ABC';
            descricaoRotina = 'A: Empurrar | B: Pernas e Abdômen | C: Puxar. Foco em volume por grupo muscular.';
        } else if (diasDisponiveis === 4) {
            divisao = 'Superiores / Inferiores';
            descricaoRotina = 'Dois dias focados em membros superiores e dois em inferiores/core.';
        } else if (diasDisponiveis === 5) {
            divisao = 'ABC + Superiores/Inferiores';
            descricaoRotina = 'Inicia com ABC, seguido de um dia de descanso e finaliza com foco em Superiores e Inferiores.';
        } else {
            divisao = 'ABC ABC (2x)';
            descricaoRotina = 'Rotina de alta frequência. ABC - Descanso - ABC. Recomendado para nível avançado.';
        }

        // 2. Buscar Exercícios do Banco
        const todosExercicios = await Exercicio.findAll();
        
        /**
         * Filtro de Segurança e Progressão
         * @param {Object} ex - Objeto do exercício do banco
         * @param {Number} nivelUsuario - Nível de força do usuário para aquele grupo
         */
        const validarExercicio = (ex, nivelUsuario) => {
            // Regra 1: Nível do exercício não pode ser muito superior ao do usuário
            // Permitimos no máximo +1 nível para gerar desafio, mas nunca exercícios de nível 5 para quem é nível 1
            if (ex.nivel > (nivelUsuario + 1)) return false;

            // Regra 2: Filtro de Habilidades
            // Se o exercício é do tipo 'Habilidade', só recomendamos se o objetivo for 'Aprender movimentos avançados'
            // E apenas se o usuário já tiver uma base mínima (nível 3+)
            if (ex.tipo === 'Habilidade') {
                if (objetivo !== 'Aprender movimentos avançados') return false;
                if (nivelUsuario < 3) return false;
            }

            // Regra 3: Filtro de Equipamentos (Opcional, se implementado no banco)
            // Aqui poderíamos cruzar com a tabela Exercicio_Equipamento
            
            return true;
        };

        const selecionarMelhoresExs = (grupo, nivelUsuario, quantidade = 3) => {
            return todosExercicios
                .filter(ex => ex.grupo_muscular === grupo)
                .filter(ex => validarExercicio(ex, nivelUsuario))
                .sort((a, b) => b.nivel - a.nivel) // Pega os mais desafiadores dentro do limite
                .slice(0, quantidade);
        };

        // 3. Configurar Parâmetros de Carga
        const getParams = (tipoEx) => {
            if (objetivo === 'Força') return { series: '4', repeticoes_ou_tempo: '4-6', descanso: '180s' };
            if (objetivo === 'Desenvolvimento Muscular') return { series: '3', repeticoes_ou_tempo: '8-12', descanso: '90s' };
            if (tipoEx === 'Habilidade') return { series: '4', repeticoes_ou_tempo: '10-15s', descanso: '120s' };
            return { series: '3', repeticoes_ou_tempo: '12-15', descanso: '60s' };
        };

        // 4. Montar a Ficha
        const ficha = {
            perfilIdentificado: classificacao.perfil.label,
            objetivo: objetivo,
            divisao: divisao,
            descricao: descricaoRotina,
            instrucoesGerais: "Foque na qualidade do movimento. Se a execução falhar antes do mínimo de repetições, use a regressão indicada no catálogo.",
            dias: []
        };

        // Lógica de montagem dos dias conforme a divisão
        const grupos = ['Empurrar', 'Puxar', 'Pernas', 'Abdômen'];
        
        if (divisao === 'Full Body') {
            const dia = { nome: 'Treino A', exercicios: [] };
            grupos.forEach(g => {
                selecionarMelhoresExs(g, forca[g], 2).forEach(ex => {
                    dia.exercicios.push({ ...ex.toJSON(), ...getParams(ex.tipo) });
                });
            });
            ficha.dias.push(dia);
        } else if (divisao === 'ABC') {
            ficha.dias.push({ 
                nome: 'Dia A - Empurrar', 
                exercicios: selecionarMelhoresExs('Empurrar', forca['Empurrar'], 4).map(ex => ({ ...ex.toJSON(), ...getParams(ex.tipo) })) 
            });
            ficha.dias.push({ 
                nome: 'Dia B - Puxar', 
                exercicios: selecionarMelhoresExs('Puxar', forca['Puxar'], 4).map(ex => ({ ...ex.toJSON(), ...getParams(ex.tipo) })) 
            });
            ficha.dias.push({ 
                nome: 'Dia C - Pernas e Core', 
                exercicios: [
                    ...selecionarMelhoresExs('Pernas', forca['Pernas'], 3).map(ex => ({ ...ex.toJSON(), ...getParams(ex.tipo) })),
                    ...selecionarMelhoresExs('Abdômen', forca['Abdômen'], 2).map(ex => ({ ...ex.toJSON(), ...getParams(ex.tipo) }))
                ]
            });
        } else {
            // Divisões superiores/inferiores seguem lógica similar...
            const diaSup = { nome: 'Superior', exercicios: [] };
            ['Empurrar', 'Puxar'].forEach(g => {
                selecionarMelhoresExs(g, forca[g], 3).forEach(ex => diaSup.exercicios.push({ ...ex.toJSON(), ...getParams(ex.tipo) }));
            });
            const diaInf = { nome: 'Inferior', exercicios: [] };
            ['Pernas', 'Abdômen'].forEach(g => {
                selecionarMelhoresExs(g, forca[g], 3).forEach(ex => diaInf.exercicios.push({ ...ex.toJSON(), ...getParams(ex.tipo) }));
            });
            ficha.dias.push(diaSup, diaInf);
        }

        return ficha;
    }
}

module.exports = TreinoService;