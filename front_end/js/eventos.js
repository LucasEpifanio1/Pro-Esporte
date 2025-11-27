import { listarEventos } from "./database.js";

function carregarEventos() {
    const div = document.getElementById("eventos");
    const lista = listarEventos();

    div.innerHTML = "";

    lista.forEach(evento => {
        const card = document.createElement("div");
        card.className = "cardEvento";

        card.innerHTML = `
            <h3>${evento.nome}</h3>
            <p><strong>Modalidade:</strong> ${evento.modalidade}</p>
            <p><strong>Local:</strong> ${evento.local}</p>
            <p><strong>Data:</strong> ${evento.data}</p>
            <p><strong>Horário:</strong> ${evento.horario}</p>
            <p><strong>Vagas:</strong> ${evento.vagas}</p>
            <p><strong>Descrição:</strong> ${evento.descricao}</p>
            <hr>
        `;

        div.appendChild(card);
    });
}

carregarEventos();
