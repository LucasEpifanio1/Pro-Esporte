const eventosContainer = document.getElementById('eventos');
const btnCriarEvento = document.getElementById('criarEventos');
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

// RBAC: Esconder botão de criar evento para cidadãos
if (usuarioLogado && usuarioLogado.tipo === 'cidadao') {
  if (btnCriarEvento) btnCriarEvento.style.display = 'none';
}

async function carregarEventos() {
  const modalidade = document.getElementById('filtroModalidades').value;
  const turno = document.getElementById('filtroTurnos').value;
  const local = document.getElementById('filtroLocais').value;

  const params = new URLSearchParams({ modalidade, turno, local });

  try {
    const response = await fetch(`http://localhost:3333/eventos?${params}`);
    const eventos = await response.json();

    eventosContainer.innerHTML = '';

    eventos.forEach(evento => {
      const card = document.createElement('div');
      card.className = 'evento-card evento-estilizado';
      
      card.innerHTML = `
        <img class="evento-imagem" src="${evento.imagem || './img/evento-padrao.jpg'}" alt="Imagem do evento">
        <h3>${evento.titulo}</h3>
        <div class="evento-info">
          <div class="info-item">📍 ${evento.local}</div>
          <div class="info-item">📅 ${formatarData(evento.data)}</div>
          <div class="info-item">⏰ ${evento.horario}</div>
          <div class="info-item">🏃 ${evento.modalidade}</div>
          <div class="info-item">🎟️ ${evento.vagas} vagas</div>
        </div>
        <div class="botoes-card">
          <button onclick="verDetalhes(${evento.ID_Evento})">Ver detalhes</button>
          ${usuarioLogado && usuarioLogado.tipo === 'cidadao' ? 
            `<button class="btn-participar" onclick="participar(${evento.ID_Evento})">Participar</button>` : ''}
        </div>
      `;
      eventosContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
  }
}

async function verDetalhes(id) {
  try {
    const response = await fetch(`http://localhost:3333/eventos/${id}`);
    const evento = await response.json();
    
    const criador = evento.empresa || evento.servidor;
    const infoCriador = criador ? `
      <p><strong>Responsável:</strong> ${criador.nome}</p>
      <p><strong>Contato:</strong> ${criador.email}</p>
      ${criador.cnpj ? `<p><strong>CNPJ:</strong> ${criador.cnpj}</p>` : ''}
    ` : '<p>Responsável não informado</p>';

    alert(`
      DETALHES DO EVENTO:
      Título: ${evento.titulo}
      Descrição: ${evento.descricao || 'Sem descrição'}
      Local: ${evento.local}
      Data: ${formatarData(evento.data)} às ${evento.horario}
      
      INFORMAÇÕES DO ORGANIZADOR:
      ${infoCriador.replace(/<[^>]*>/g, '')}
    `);
  } catch (error) {
    alert("Erro ao carregar detalhes.");
  }
}

async function participar(idEvento) {
  if (!usuarioLogado || usuarioLogado.tipo !== 'cidadao') {
    alert("Apenas cidadãos podem se inscrever em eventos.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3333/participar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_Cidadao: usuarioLogado.identificador,
        ID_Evento: idEvento
      })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("Erro ao realizar inscrição.");
  }
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

document.getElementById('filtroModalidades').addEventListener('change', carregarEventos);
document.getElementById('filtroTurnos').addEventListener('change', carregarEventos);
document.getElementById('filtroLocais').addEventListener('change', carregarEventos);

carregarEventos();
