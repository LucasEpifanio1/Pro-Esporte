document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  
    if (!usuario) {
      alert('Usuário não logado');
      window.location.href = 'index.html';
      return;
    }
  
    document.getElementById('nome').textContent = usuario.nome;
    document.getElementById('tipo').textContent = usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1);
    
    // Como o login retorna apenas o básico, o email pode não estar no localStorage
    // Mas podemos mostrar o identificador (CNPJ/CPF/ID)
    const emailSalvo = localStorage.getItem("email do criador de evento");
    if (emailSalvo) {
        document.getElementById('email').textContent = emailSalvo;
    } else {
        document.getElementById('email').textContent = "Não informado";
    }

    document.getElementById('telefone').textContent = usuario.identificador || '-';
  });

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}