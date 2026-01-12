document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
  
    if (!usuario) {
      alert('Usuário não logado');
      window.location.href = 'index.html';
      return;
    }
  
    document.getElementById('nome').textContent = usuario.nome;
    document.getElementById('email').textContent = usuario.email;
    document.getElementById('telefone').textContent = usuario.telefone || '-';
    document.getElementById('tipo').textContent = usuario.tipo;
  });
  