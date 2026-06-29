// Tem q pegar o ip do pc por enquanto
export const API_URL = 'http://192.168.1.4:3333';

export async function cadastrarCidadao(dados) {
    const resposta = await fetch(
        `${API_URL}/cidadao`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }
    );
    return resposta.json();
}

export async function cadastrarEmpresa(dados) {
    const respostaEmpresa = await fetch(
        `${API_URL}/empresa`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }
    );
    return respostaEmpresa.json();
}
export async function cadastrarServidor(dados) {
    const respostaServidor = await fetch(
        `${API_URL}/servidorPublico`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }
    );
    return respostaServidor.json();
}

export async function loginUsuario(dados){
    const respostaLogin = await fetch(
        `${API_URL}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }
    );
    return respostaLogin.json();
}