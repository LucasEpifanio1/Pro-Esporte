import { adicionarEvento } from "/databaseTeste.js";

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const evento = {
        nome: document.getElementById("nomeEvento").value,
        modalidade: document.getElementById("modalidades").value,
        local: document.getElementById("localEvento").value,
        data: document.getElementById("data").value,
        horario: document.getElementById("horario").value,
        vagas: document.getElementById("vagas").value,
        descricao: document.getElementById("descricaoEvento").value
    };
    adicionarEvento(evento);

    window.location.href = "eventos.html";
});
