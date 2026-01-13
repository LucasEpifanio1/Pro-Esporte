document.getElementById('formCriarEvento').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    
    titulo: document.getElementById('nomeEvento').value,
    modalidade: document.getElementById('modalidades').value,
    local: document.getElementById('localEvento').value,
    data: document.getElementById('data').value,
    horario: document.getElementById('horario').value,
    vagas: document.getElementById('vagas').value,
    descricao: document.getElementById('descricaoEvento').value,
    imagem: document.getElementById('imagemEvento').value
  };

  try {
    const response = await fetch('http://localhost:3333/evento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      const erro = await response.json();
      alert(erro.error || 'Erro ao criar evento');
      return;
    }

    // ✅ sucesso → volta para página de eventos
    window.location.href = 'eventos.html';

  } catch (error) {
    console.error(error);
    alert('Erro ao conectar com o servidor');
  }
});
