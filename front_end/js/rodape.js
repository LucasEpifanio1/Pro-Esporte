function rodape() {
  return `
        <div class="item" onclick="irInicio()">
            <img src="img/home.png" class="icon" >
            <p>Início</p>
        </div>
        <div class="item" onclick="irEventos()">
            <img src="img/calendar.png" class="icon">
            <p>Eventos</p>
        </div>
        <div class="item">
            <img src="img/train.png" class="icon">
            <p>Treinos</p>
        </div>
        <div class="item" onclick="irPerfil()">
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
