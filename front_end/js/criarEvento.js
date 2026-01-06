//pega todos os valores digitados (nome, modalidade, local, data, horário, vagas, descrição),
// cria um objeto evento com essas informações e chama a função adicionarEvento()
// para salvar esse evento no “banco de dados”.Depois disso, ele redireciona o usuário para a página eventos.html.
import { adicionarEvento } from "./dataBaseTeste.js";

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const tipo = localStorage.getItem("tipoUsuario");
  const email = localStorage.getItem("email do criador de evento");
  console.log("Tipo recuperado:", tipo);
  console.log("email recuperado:", email);

  const evento = {
    nome: document.getElementById("nomeEvento").value,
    modalidade: document.getElementById("modalidades").value,
    local: document.getElementById("localEvento").value,
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value,
    vagas: document.getElementById("vagas").value,
    descricao: document.getElementById("descricaoEvento").value,
    tipoUsuario: tipo,
    email: email,
  };

  try {
    const resposta = await fetch("http://localhost:3000/evento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosEvento),
    });

    if (resposta.ok) {
      alert("Evento criado com sucesso!");
      window.location.href = "eventos.html";
    } else {
      alert("Erro ao criar evento.");
    }
  } catch (error) {
    console.error("Erro na conexão:", error);
  }

  adicionarEvento(evento);

  window.location.href = "eventos.html";
});
