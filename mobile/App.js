import { useEffect, useState } from 'react';

import AppNavigator from './src/navigation/AppNavigator';

import { obterUsuario } from './src/storage/authStorage';

import { criarTabelas } from './src/database/schema';

export default function App() {

  const [usuario, setUsuario] = useState(undefined);

  useEffect(() => {

    async function inicializarBanco() {
      
      await criarTabelas();
      console.log('Tabelas criadas com sucesso!');
    }
    
    inicializarBanco();

    async function carregarSessao() {

      const sessao = await obterUsuario();

      setUsuario(sessao);

    }

    carregarSessao();

  }, []);

  if (usuario === undefined) {
    return null;
  }

  return (
    <AppNavigator usuario={usuario} />
  );

}