document.getElementById('formCriarEvento').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  
  if (!usuarioLogado || usuarioLogado.tipo === 'cidadao') {
    mostrarToast("Você não tem permissão para criar eventos.");
    return;
  }

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

  // Adiciona a chave estrangeira correta baseada no tipo de usuário
  if (usuarioLogado.tipo === 'empresa') {
    dados.FK_Empresa = usuarioLogado.identificador;
  } else if (usuarioLogado.tipo === 'servidor_publico' || usuarioLogado.tipo === 'servidorPublico') {
    dados.FK_Servidor = usuarioLogado.identificador;
  }

  try {
    const response = await fetch(`${API_URL}/evento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      const erro = await response.json();
      mostrarToast(erro.error || 'Erro ao criar evento');
      return;
    }

    mostrarToast("Evento criado com sucesso!");
    setTimeout(() => {
          window.location.href = "eventos.html";
    }, 2000);

  } catch (error) {
    console.error(error);
    mostrarToast('Erro ao conectar com o servidor');
  }
});

function mostrarToast(mensagem, tipo = "info", tempo = 3000) {
  const toast = document.getElementById("toast");

  toast.textContent = mensagem;
  toast.className = `toast show ${tipo}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, tempo);
}
