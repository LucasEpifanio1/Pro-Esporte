import { API_URL } from './api';

function montarQueryString(filtros = {}) {
  const params = new URLSearchParams();

  Object.entries(filtros).forEach(([chave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== '') {
      params.append(chave, valor);
    }
  });

  return params.toString();
}

async function tratarResposta(resposta) {
  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const mensagem = dados?.error || dados?.message || 'Erro na requisição.';
    throw new Error(mensagem);
  }

  return dados;
}

export async function listarEventos(filtros = {}) {
  const queryString = montarQueryString(filtros);
  const url = `${API_URL}/eventos${queryString ? `?${queryString}` : ''}`;
  console.log('Buscando:', url);

  const resposta = await fetch(url);
  console.log('Status:', resposta.status);
  return tratarResposta(resposta);
}

export async function buscarDetalhesEvento(idEvento) {
  const resposta = await fetch(`${API_URL}/eventos/${idEvento}`);
  return tratarResposta(resposta);
}

export async function criarEvento(dadosEvento) {
  const resposta = await fetch(`${API_URL}/evento`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosEvento)
  });

  return tratarResposta(resposta);
}

export async function participarEvento({ idCidadao, idEvento }) {
  const resposta = await fetch(`${API_URL}/participar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ID_Cidadao: idCidadao,
      ID_Evento: idEvento
    })
  });

  return tratarResposta(resposta);
}

export async function listarParticipacoes(idCidadao) {
  const resposta = await fetch(`${API_URL}/participacoes/${idCidadao}`);
  return tratarResposta(resposta);
}