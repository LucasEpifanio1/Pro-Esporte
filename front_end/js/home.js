function cardEventos() {
  window.location.href = 'eventos.html';
}
function cardTreinos() {
  const fichaTreino = localStorage.getItem('fichaTreino');
  if (fichaTreino) {
    window.location.href = 'dashboard.html'; // Tela do dashboard
  } else {
    window.location.href = 'questionarioTreino.html'; // Tela das perguntas
  }
}
