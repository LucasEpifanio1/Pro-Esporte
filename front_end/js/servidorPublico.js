document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formServidorPublico');

  if (!form) {
    console.error('Formulário formServidorPublico não encontrado');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      cpf: document.getElementById('cpf').value, // padrão correto
      telefone: document.getElementById('telefone').value,
      senha: document.getElementById('senha').value
    };

    try {
      const response = await fetch('http://localhost:3333/servidorPublico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao cadastrar servidor público');
        return;
      }

      // sucesso → redireciona para a home
      window.location.href = 'home.html';

    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor');
    }
  });
});
