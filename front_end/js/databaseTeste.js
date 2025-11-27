// "Banco" temporário em JS 

// Simula inserir no banco
export function adicionarEvento(evento) {
    eventosDB.push(evento);
}

export function listarEventos() {
    return eventosDB;
}
