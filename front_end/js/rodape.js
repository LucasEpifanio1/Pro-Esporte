function rodape() {
  // Pega o nome do arquivo atual para saber qual ícone acender
  const path = window.location.pathname;
  const paginaAtual = path.substring(path.lastIndexOf('/') + 1);

  return `
        <div class="item ${paginaAtual === 'home.html' || paginaAtual === '' ? 'active' : ''}" onclick="irInicio()">
            <img src="img/home.png" class="icon" >
            <p>Início</p>
        </div>
        <div class="item ${paginaAtual === 'eventos.html' ? 'active' : ''}" onclick="irEventos()">
            <img src="img/calendar.png" class="icon">
            <p>Eventos</p>
        </div>
        <div class="item ${paginaAtual === 'dashboard.html'|| paginaAtual === 'rotina.html' || paginaAtual === 'evolucao.html' ? 'active' : ''}" onclick="irTreinos()">
            <img src="img/train.png" class="icon">
            <p>Treinos</p>
        </div>
        <div class="item ${paginaAtual === 'perfil.html' ? 'active' : ''}" onclick="irPerfil()">
            <img src="img/user.png" class="icon">
            <p>Perfil</p>
        </div>
    `;
}

const campoRodape = document.getElementById("rodape");
if (campoRodape) {
  campoRodape.innerHTML = rodape();
}

function irInicio() {
  window.location.href = 'home.html';
}

function irEventos() {
  window.location.href = 'eventos.html';
}

function irPerfil() {
  window.location.href = 'perfil.html';
}

function irTreinos() {
  const fichaTreino = localStorage.getItem('fichaTreino');
  if (fichaTreino) {
    window.location.href = 'dashboard.html'; // Tela do dashboard
  } else {
    window.location.href = 'questionarioTreino.html'; // Tela das perguntas
  }
}