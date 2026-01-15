// Simulando o que viria do banco de dados
const dadosDoTreino = {
    objetivo: "Força",
    diasTreinados: 12,
    sequencia: "3 semanas",
    exercicios: [
        { nome: "Flexões", atual: 15, meta: 20, inicial: 5 },
        { nome: "Barras Fixas", atual: 3, meta: 10, inicial: 0 },
        { nome: "Agachamentos", atual: 25, meta: 30, inicial: 10 }
    ]
};

function carregarPagina() {
    // 1. Corrigido: usando o nome certo do objeto 'dadosDoTreino'
    const elementoObjetivo = document.getElementById("objetivo");
    if (elementoObjetivo) {
        elementoObjetivo.innerText = dadosDoTreino.objetivo;
    }
    
    // 2. Corrigido: pegando o elemento de dias e a sequência
    const elementoDias = document.getElementById("diasTreinados");
    if (elementoDias) {
        elementoDias.innerText = dadosDoTreino.diasTreinados;
    }

    const elementoSequencia = document.getElementById("sequencia");
    if (elementoSequencia) {
        elementoSequencia.innerText = dadosDoTreino.sequencia;
    }
}



function renderizarEvolucao() {
    const container = document.getElementById('lista-exercicios');
    
    dadosDoTreino.exercicios.forEach(ex => {
        // Cálculo da largura da barra em porcentagem
        const porcentagem = (ex.atual / ex.meta) * 100;

        container.innerHTML += `
            <div class="card-progresso">
                <div class="progresso-topo">
                    <span>${ex.nome}</span>
                    <span class="amarelo">${ex.atual}/${ex.meta}</span>
                </div>
                <div class="barra-fundo">
                    <div class="barra-preenchida" style="width: ${porcentagem}%"></div>
                </div>
                <div class="progresso-base">
                    <span>Inicial: ${ex.inicial}</span>
                    <span>Meta: ${ex.meta}</span>
                </div>
            </div>
        `;
    });
}

carregarPagina();
renderizarEvolucao();
