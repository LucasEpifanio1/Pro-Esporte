const Exercicio = require('../models/exercicio');

class TreinoService {
    // Exercícios base para o KNN conforme solicitado
    // Ordem do vetor: [Flexão Inclinada, Flexão Padrão, Barra Australiana, Barra Fixa, Agachamento Sofá, Agachamento Padrão, Prancha 4 Apoios (s), Abdominal Supra]
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

    static classificarNivel(respostas) {
        const vetorUsuario = [
            respostas.flexaoInclinada || 0,
            respostas.flexaoPadrao || 0,
            respostas.barraAustraliana || 0,
            respostas.barraFixa || 0,
            respostas.agachamentoSofa || 0,
            respostas.agachamentoPadrao || 0,
            respostas.prancha || 0,
            respostas.abdominalSupra || 0
        ];

        let menorDistancia = Infinity;
        let perfilMaisProximo = null;

        this.perfisReferencia.forEach(perfil => {
            const d = this.calcularDistanciaEuclidiana(vetorUsuario, perfil.niveis);
            if (d < menorDistancia) {
                menorDistancia = d;
                perfilMaisProximo = perfil;
            }
        });

        // Mapeamento de força por grupo baseado nos exercícios chave
        return {
            perfil: perfilMaisProximo,
            forcaGrupos: {
                empurrar: Math.max(respostas.flexaoPadrao > 10 ? 4 : 2, respostas.flexaoInclinada > 15 ? 3 : 1),
                puxar: Math.max(respostas.barraFixa > 5 ? 4 : 2, respostas.barraAustraliana > 10 ? 3 : 1),
                pernas: Math.max(respostas.agachamentoPadrao > 15 ? 4 : 2, respostas.agachamentoSofa > 15 ? 2 : 1),
                abdomen: Math.max(respostas.prancha > 45 ? 4 : 2, respostas.abdominalSupra > 15 ? 3 : 1)
            }
        };
    }

    static async gerarTreino(dados) {
        const { respostas, objetivo, diasDisponiveis, equipamentos } = dados;
        const classificacao = this.classificarNivel(respostas);
        const forca = classificacao.forcaGrupos;

        // 1. Determinar Divisão e Descrição
        let divisao = '';
        let descricaoRotina = '';
        
        if (diasDisponiveis <= 2) {
            divisao = 'Full Body';
            descricaoRotina = 'Treine o corpo todo em uma única sessão. Ideal para manutenção e iniciantes.';
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

        // 2. Buscar e Filtrar Exercícios
        const todosExercicios = await Exercicio.findAll();
        
        // Mapeamento de equipamentos (simplificado para o filtro)
        const filtrarPorEquipamento = (ex) => {
            if (!equipamentos || equipamentos.length === 0) return true;
            // Lógica: se o exercício precisa de barra e o usuário não tem, remove.
            if (ex.nome.toLowerCase().includes('barra') && !equipamentos.some(e => e.toLowerCase().includes('barra'))) return false;
            if (ex.nome.toLowerCase().includes('paralela') && !equipamentos.some(e => e.toLowerCase().includes('paralela'))) return false;
            return true;
        };

        const selecionarExs = (grupo, nivelMax) => {
            return todosExercicios
                .filter(ex => ex.grupo_muscular === grupo && ex.nivel <= (nivelMax + 1))
                .filter(filtrarPorEquipamento)
                .sort((a, b) => b.nivel - a.nivel)
                .slice(0, 3);
        };

        // 3. Configurar Parâmetros
        let params = { series: '3', reps: '8-12', descanso: '60-90s' };
        if (objetivo === 'Força') params = { series: '5', reps: '3-5', descanso: '120-180s' };
        if (objetivo === 'Resistência') params = { series: '3', reps: '15-20', descanso: '30-45s' };
        if (objetivo === 'Habilidades') params = { series: '4', reps: '5-10s (Isometria)', descanso: '60s' };

        // 4. Montar Ficha de Treino
        const ficha = {
            perfilIdentificado: classificacao.perfil.label,
            objetivo: objetivo,
            divisao: divisao,
            descricao: descricaoRotina,
            instrucoesGerais: "Mantenha a forma perfeita em cada repetição. Se não conseguir completar a faixa de repetições, use uma regressão do exercício.",
            dias: []
        };

        if (divisao === 'Full Body') {
            const dia = { nome: 'Dia Único', exercicios: [] };
            ['Empurrar', 'Puxar', 'Pernas', 'Abdômen'].forEach(g => {
                const nivel = g === 'Empurrar' ? forca.empurrar : g === 'Puxar' ? forca.puxar : g === 'Pernas' ? forca.pernas : forca.abdomen;
                selecionarExs(g, nivel).forEach(e => dia.exercicios.push({ ...e.toJSON(), ...params }));
            });
            ficha.dias.push(dia);
        } else if (divisao.includes('ABC')) {
            const diaA = { nome: 'Dia A - Empurrar', exercicios: selecionarExs('Empurrar', forca.empurrar).map(e => ({ ...e.toJSON(), ...params })) };
            const diaB = { nome: 'Dia B - Pernas e Abdômen', exercicios: [
                ...selecionarExs('Pernas', forca.pernas).map(e => ({ ...e.toJSON(), ...params })),
                ...selecionarExs('Abdômen', forca.abdomen).map(e => ({ ...e.toJSON(), ...params }))
            ]};
            const diaC = { nome: 'Dia C - Puxar', exercicios: selecionarExs('Puxar', forca.puxar).map(e => ({ ...e.toJSON(), ...params })) };
            ficha.dias.push(diaA, diaB, diaC);
            
            if (divisao.includes('2x')) {
                ficha.dias.push({ nome: 'Descanso', exercicios: [], nota: 'Recuperação ativa ou descanso total.' });
                ficha.dias.push(diaA, diaB, diaC);
            }
        } else if (divisao.includes('Superiores')) {
            const sup = { nome: 'Superiores', exercicios: [
                ...selecionarExs('Empurrar', forca.empurrar).map(e => ({ ...e.toJSON(), ...params })),
                ...selecionarExs('Puxar', forca.puxar).map(e => ({ ...e.toJSON(), ...params }))
            ]};
            const inf = { nome: 'Inferiores e Core', exercicios: [
                ...selecionarExs('Pernas', forca.pernas).map(e => ({ ...e.toJSON(), ...params })),
                ...selecionarExs('Abdômen', forca.abdomen).map(e => ({ ...e.toJSON(), ...params }))
            ]};
            ficha.dias.push(sup, inf, sup, inf);
        }

        return ficha;
    }
}

module.exports = TreinoService;
