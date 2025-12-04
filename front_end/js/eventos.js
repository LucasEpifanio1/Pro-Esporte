//busca todos os eventos salvos, e, para cada evento, cria um card no HTML mostrando as informções do evento.
//Também adiciona um botão "Ver detalhes" em cada card. No final, ele executa a função carregarEventos() para montar a lista assim que a página abrir.
import { listarEventos } from "./dataBaseTeste.js";

function carregarEventos() {
    const div = document.getElementById("eventos");
    const lista = listarEventos();

    div.innerHTML = "";

    lista.forEach((evento, index) => {  
        const card = document.createElement("div");
        card.className = "cardModal";

        card.innerHTML = `
            <div class="evento-card">
                <h3>${evento.nome}</h3>

                <div class="evento-info">
                    <div class="info-item"><i></i> ${evento.modalidade}</div>
                    <div class="info-item"><i></i> ${evento.local}</div>
                    <div class="info-item"><i></i> ${evento.data}</div>
                    <div class="info-item"><i></i> ${evento.horario}</div>
                    <div class="info-item"><i></i> ${evento.vagas}</div>

                    <button class="detalhes-btn" data-id="${index}">
                        Ver detalhes
                    </button>
                </div>
            </div>
        `;

        div.appendChild(card);
    });
}
carregarEventos();



