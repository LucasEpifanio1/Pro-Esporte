const eventosContainer = document.getElementById('eventos');

async function carregarEventos() {
  const modalidade = document.getElementById('filtroModalidades').value;
  const turno = document.getElementById('filtroTurnos').value;
  const local = document.getElementById('filtroLocais').value;

  const params = new URLSearchParams({
    modalidade,
    turno,
    local
  });

  const response = await fetch(`http://localhost:3333/eventos?${params}`);
  const eventos = await response.json();

  eventosContainer.innerHTML = '';

  eventos.forEach(evento => {
    eventosContainer.innerHTML += `
      <div class="evento-card evento-estilizado">

        <img 
          class="evento-imagem"
          src="${evento.imagem || './img/evento-padrao.jpg'}"
          alt="Imagem do evento"
        >

        <h3>${evento.titulo}</h3>

        <div class="evento-info">
          <div class="info-item">📍 ${evento.local}</div>
          <div class="info-item">📅 ${formatarData(evento.data)}</div>
          <div class="info-item">⏰ ${evento.horario}</div>
          <div class="info-item">🏃 ${evento.modalidade}</div>
          <div class="info-item">🎟️ ${evento.vagas} vagas</div>
        </div>

        <button>Ver detalhes</button>
      </div>
    `;
  });
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

document.getElementById('filtroModalidades').addEventListener('change', carregarEventos);
document.getElementById('filtroTurnos').addEventListener('change', carregarEventos);
document.getElementById('filtroLocais').addEventListener('change', carregarEventos);

carregarEventos();
