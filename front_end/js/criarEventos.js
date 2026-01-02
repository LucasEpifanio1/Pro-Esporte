//pega todos os valores digitados (nome, modalidade, local, data, horário, vagas, descrição), 
// cria um objeto evento com essas informações e chama a função adicionarEvento() 
// para salvar esse evento no “banco de dados”.Depois disso, ele redireciona o usuário para a página eventos.html.
import { adicionarEvento } from "./dataBaseTeste.js";

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