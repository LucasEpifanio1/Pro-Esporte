function rodape() {
  return `
        <div class="item">
            <img src="img/home.png" class="icon" >
            <p>Início</p>
        </div>
        <div class="item">
            <img src="/front_end/img/calendar.png" class="icon">
            <p>Eventos</p>
        </div>
        <div class="item">
            <img src="/front_end/img/train.png" class="icon">
            <p>Treinos</p>
        </div>
        <div class="item" onclick="irPerfil()">
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
    window.location.href = 'treinos.html';
  }
  
  function irPerfil() {
    window.location.href = 'perfil.html';
  }
  