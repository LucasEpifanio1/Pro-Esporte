function cardEventos() {
  window.location.href = "/front_end/eventos.html";
}
function cardTreinos() {
  const fichaTreino = localStorage.getItem('fichaTreino');
  if (fichaTreino) {
    window.location.href = '/front_end/dashboard.html'; // Tela do dashboard
  } else {
    window.location.href = '/front_end/questionarioTreino.html'; // Tela das perguntas
  }
}
