function opcaoCidadao() {
  localStorage.setItem("tipo", "cidadao");
  window.location.href = "loginCidadao.html";
}
function opcaoCriador() {
  localStorage.setItem("tipo", "criador");
  window.location.href = "tipoCriadorEventos.html";
}
function opcaoEmpresa() {
  localStorage.setItem("tipo", "empresa");
  window.location.href = "loginEmpresa.html";
}
function opcaoServidorPublico() {
  localStorage.setItem("tipo", "servidorPublico");
  window.location.href = "loginServidor.html";
}

function voltarIndex() {
  window.location.href = "index.html";
}
