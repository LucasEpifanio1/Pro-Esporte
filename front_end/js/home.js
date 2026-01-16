function cardEventos() {
  window.location.href = "/front_end/eventos.html";
}
function cardTreinos() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuario.respondeuQuestionario) {
    window.location.href = '/front_end/dashboard.html'; // Tela do dashboard
  } else {
    window.location.href = '/front_end/questionarioTreino.html'; // Tela das perguntas
  }
}
