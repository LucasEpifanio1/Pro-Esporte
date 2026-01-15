function rodape() {
  // Pega o nome do arquivo atual (ex: 'home.html')
  const paginaAtual = window.location.pathname.split("/").pop();

  return `
        <div class="item ${paginaAtual === 'home.html' || paginaAtual === '' ? 'active' : ''}" onclick="irInicio()">
            <img src="img/home.png" class="icon" >
            <p>Início</p>
        </div>
        <div class="item ${paginaAtual === 'eventos.html' ? 'active' : ''}" onclick="irEventos()">
            <img src="/front_end/img/calendar.png" class="icon">
            <p>Eventos</p>
        </div>
        <div class="item ${paginaAtual === 'dashboard.html' ? 'active' : ''}" onclick="irTreinos()">
            <img src="/front_end/img/train.png" class="icon">
            <p>Treinos</p>
        </div>
        <div class="item ${paginaAtual === 'perfil.html' ? 'active' : ''}" onclick="irPerfil()">
            <img src="/front_end/img/user.png" class="icon">
            <p>Perfil</p>
        </div>
    `;
}

const campo = document.getElementById("rodape");
campo.innerHTML = rodape();

function irInicio() {
    window.location.href = 'home.html';
  }
  
  function irEventos() {
    window.location.href = 'eventos.html';
  }
  
  function irTreinos() {
    window.location.href = 'dashboard.html';
  }
  
  function irPerfil() {
    window.location.href = 'perfil.html';
  }
  