document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formEmpresa');

  if (!form) {
    console.error('Formulário formEmpresa não encontrado');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      cnpj: document.getElementById('cnpj').value, // padrão em minúsculo
      telefone: document.getElementById('telefone').value,
      senha: document.getElementById('senha').value
    };

    try {
      const response = await fetch(`${API_URL}/empresa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao cadastrar empresa');
        return;
      }

      // sucesso
      window.location.href = 'home.html';

    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor');
    }
  });
});
