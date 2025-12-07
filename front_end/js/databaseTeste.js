// Banco temporário apenas para testar
export function adicionarEvento(evento) {
    // Pega o evento salvo no sessionStorage.  não existir nada usa um array vazio
    const existentes = JSON.parse(sessionStorage.getItem("eventos") || "[]");
    // Adiciona o novo evento na lista existente.
    existentes.push(evento);

    // Salva a lista atualizada de volta no sessionStorage, ela precisa ser convertida para texto
    sessionStorage.setItem("eventos", JSON.stringify(existentes));
}
export function listarEventos() {
    // Retorna os eventos que estão armazenados, Se não houver nenhum, devolve um array vazio
    return JSON.parse(sessionStorage.getItem("eventos") || "[]");
}
