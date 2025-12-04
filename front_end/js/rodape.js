function rodape() {
    return `
        <div class="item">
            <img src="/img/home.png" class="icon" >
            <p>Início</p>
        </div>
        <div class="item">
            <img src="/img/calendar.png" class="icon">
            <p>Eventos</p>
        </div>
        <div class="item">
            <img src="/img/dumbbell.png" class="icon">
            <p>Treinos</p>
        </div>
        <div class="item">
            <img src="/img/user.png" class="icon">
            <p>Perfil</p>
        </div>
    `;
}

const campo = document.getElementById("rodape");
campo.innerHTML = rodape();
