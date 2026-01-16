function carregarRotina() {
    const ficha = JSON.parse(localStorage.getItem('fichaTreino'));
    
    if (!ficha) {
        alert("Nenhuma rotina encontrada. Por favor, faça o questionário.");
        window.location.href = "questionarioTreino.html";
        return;
    }

    // Preencher informações do cabeçalho
    document.getElementById("divisao").innerText = ficha.divisao || "Personalizada";
    document.getElementById("frequencia").innerText = `${ficha.dias.length} dias por semana`;

    const containerPrincipal = document.getElementById("container-cards");
    
    if (!containerPrincipal) return;

    containerPrincipal.innerHTML = ""; 

    ficha.dias.forEach((dia) => {
        let listaExercicios = ""; 
        
        if (dia.exercicios && dia.exercicios.length > 0) {
            dia.exercicios.forEach((ex, index) => {
                listaExercicios += `
                    <div class="item-exercicio" style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                            <span class="numero-circulo">${index + 1}</span>
                            <p style="font-weight: bold; color: #FBBF24;">${ex.nome}</p>
                        </div>
                        <div style="margin-left: 35px; font-size: 0.85rem; color: #ccc;">
                            <span>${ex.series} séries x ${ex.reps}</span> | 
                            <span>Descanso: ${ex.descanso}</span>
                        </div>
                    </div>
                `;
            });
        } else {
            listaExercicios = `<p style="color: #888; font-style: italic; text-align: center; padding: 20px;">Dia de descanso ou recuperação ativa.</p>`;
        }

        containerPrincipal.innerHTML += `
            <div class="card-treino-dia" style="margin-bottom: 25px;">
                <div class="treino-topo">
                    <p class="amarelo">${dia.nome}</p>
                    <span class="subtitulo">${ficha.objetivo}</span>
                </div>
                <div class="lista-check">
                    ${listaExercicios} 
                </div>
                <button class="btn-principal" onclick="alert('Funcionalidade de iniciar treino em breve!')">Iniciar Treino</button>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', carregarRotina);
