
function opcaoCidadao() {
    localStorage.setItem("tipo", "cidadao");
    window.location.href = 'login.html';
}
function opcaoCriador() {
    localStorage.setItem("tipo", "criador");
    window.location.href = 'tipoCriadorEventos.html';
}
function opcaoEmpresa() {
    localStorage.setItem("tipo", "empresa");
    window.location.href = 'login.html';
}
function opcaoServidorPublico() {
    localStorage.setItem("tipo", "funcionarioPublico");
    window.location.href = 'login.html';
}
