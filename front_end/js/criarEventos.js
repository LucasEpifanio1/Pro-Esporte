const form = document.getElementById('formCriarEvento');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const organizadorId = localStorage.getItem('organizador_id');

  if (!organizadorId) {
    alert('Organizador não identificado. Faça login novamente.');
    return;
  }

  const evento = {
    titulo: document.getElementById('nomeEvento').value,
    modalidade: document.getElementById('modalidades').value,
    local: document.getElementById('localEvento').value,
    data: document.getElementById('data').value,
    horario: document.getElementById('horario').value,
    vagas: Number(document.getElementById('vagas').value),
    descricao: document.getElementById('descricaoEvento').value,
    organizador_id: Number(organizadorId)
  };

  try {
    const response = await fetch('http://localhost:3333/evento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evento)
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.error || 'Erro ao criar evento');
      return;
    }

    alert('Evento criado com sucesso!');
    window.location.href = '/eventos.html';

  } catch (error) {
    console.error(error);
    alert('Erro de conexão com o servidor');
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const organizadorId = localStorage.getItem('organizador_id');

  if (!organizadorId) {
    alert('Organizador não identificado. Faça login novamente.');
    window.location.href = '/index.html';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3333/organizador/${organizadorId}`);
    if (!response.ok) throw new Error('Erro ao carregar dados do organizador');

    const organizador = await response.json();

    document.getElementById('orgNome').innerText = organizador.nome_publico;

    if (organizador.tipo === 'EMPRESA' && organizador.empresa) {
      document.getElementById('orgEmail').innerText = organizador.empresa.email || '-';
      document.getElementById('orgContato').innerText = organizador.empresa.contato || '-';
      document.getElementById('orgDocumento').innerText = organizador.empresa.CNPJ;
    }

    if (organizador.tipo === 'SERVIDOR_PUBLICO' && organizador.servidor) {
      document.getElementById('orgEmail').innerText = organizador.servidor.email || '-';
      document.getElementById('orgContato').innerText = organizador.servidor.contato || '-';
      document.getElementById('orgDocumento').innerText = organizador.servidor.CPF;
    }

  } catch (error) {
    console.error(error);
    alert('Erro ao carregar dados do organizador');
  }
});
