document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCidadao');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
      const response = await fetch('http://localhost:3333/cidadao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = 'home.html';
      } else {
        alert(data.error || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor');
    }
  });
});
