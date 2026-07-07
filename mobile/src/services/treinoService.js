import { API_URL } from './api';

function formatarOpcao(valor, prancha = false) {

    if (!valor || valor === 'Não consigo fazer') return 0;

    if (prancha) {
        switch (valor) {
            case '10-20': return 15;
            case '21-30': return 25;
            case '31-60': return 45;
            case '+60': return 70;
            default: return 0;
        }
    }

    switch (valor) {
        case '1-5': return 3;
        case '5-10': return 8;
        case '10-20': return 15;
        case '+20': return 25;
        default: return 0;
    }
}

export async function gerarTreino(respostas) {

    const body = {

        respostas: {

            flexaoInclinada: formatarOpcao(respostas.flexaoInclinada),

            flexaoPadrao: formatarOpcao(respostas.flexaoPadrao),

            barraAustraliana: formatarOpcao(respostas.barraAustraliana),

            barraFixa: formatarOpcao(respostas.barraFixa),

            agachamentoSofa: formatarOpcao(respostas.agachamentoSofa),

            agachamentoPadrao: formatarOpcao(respostas.agachamentoPadrao),

            prancha: formatarOpcao(respostas.prancha, true),

            abdominalSupra: formatarOpcao(respostas.abdominalSupra),

        },

        objetivo: respostas.objetivo,

        diasDisponiveis: Number(respostas.recorrencia),

        equipamentos: respostas.equipamentos

    };

    const response = await fetch(
        `${API_URL}/treino/gerar`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    );

    if (!response.ok) {
        throw new Error('Erro ao gerar treino.');
    }

    return await response.json();

}