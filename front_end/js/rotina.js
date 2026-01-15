const dadosRotina = {
    divisao: "ABC + Superiores e Inferiores",
    frequencia: "5 dias por semana",
    diasDeTreino: [
        {
            nome: "Dia A",
            foco: "Peito e Tríceps",
            exercicios: ["Flexões", "Flexões declinadas", "Mergulho", "Tríceps banco", "Flexões diamante"]
        },
        {
            nome: "Dia B",
            foco: "Costas e Bíceps",
            exercicios: ["Barra Fixa", "Remada", "Barra australiana", "Rosca"]
        },
        {
            nome: "Dia C",
            foco: "Pernas",
            exercicios: ["Agachamento", "Afundo", "Elevação Pélvica", "Panturrilha"]
        }
    ]
};

function carregarRotina() {

    document.getElementById("divisao").innerText = dadosRotina.divisao;
    document.getElementById("frequencia").innerText = dadosRotina.frequencia;

    const containerPrincipal = document.getElementById("container-cards");
    
    //  só executa se o container existir
    if (!containerPrincipal) return;

    containerPrincipal.innerHTML = ""; 

    dadosRotina.diasDeTreino.forEach((treino) => {
        let listaExercicios = ""; 
        
        treino.exercicios.forEach((ex, index) => {
            listaExercicios += `
                <div class="item-exercicio">
                    <span class="numero-circulo">${index + 1}</span>
                    <p>${ex}</p>
                </div>
            `;
        });

        containerPrincipal.innerHTML += `
            <div class="card-treino-dia">
                <div class="treino-topo">
                    <p class="amarelo">${treino.nome}</p>
                    <span class="subtitulo">${treino.foco}</span>
                </div>
                <div class="lista-check">
                    ${listaExercicios} 
                </div>
                <button class="btn-principal">Iniciar Treino</button>
            </div>
        `;
    });
}

carregarRotina();