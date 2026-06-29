import {
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';

import {
  SafeAreaView
} from 'react-native-safe-area-context';

import {
  useState,
  useEffect
} from 'react';

import CardEvento from '../../components/evento/CardEvento';
import Rodape from '../../components/Rodape';

import {
  listarEventos
} from '../../services/eventoService';

import globalStyles from '../../styles/global';

export default function TelaEventos({
  navigation
}) {
  const [eventos, setEventos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [erro, setErro] =
    useState(null);

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {
      console.log('Entrou em carregarEventos');
      const dados =
        await listarEventos();
      console.log('Dados dos eventos:', dados);
      setEventos(dados);
    }
    catch (erro) {
      console.log('ERRO COMPLETO:', erro);

      setErro(
        'Erro ao carregar eventos.'
      );
    }
    finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView
        style={globalStyles.container}
      >
        <ActivityIndicator
          size="large"
        />
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView
        style={globalStyles.container}
      >
        <Text>{erro}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={globalStyles.container}
    >
      <FlatList
        data={eventos}
        keyExtractor={(item) =>
          item.ID_Evento.toString()
        }
        renderItem={({ item }) => (
          <CardEvento
            evento={item}
            onDetalhes={(evento) =>
              navigation.navigate(
                'TelaDetalhesEvento',
                { evento }
              )
            }
          />
        )}
      />

      <Rodape
        navigation={navigation}
        telaAtiva="eventos"
      />
    </SafeAreaView>
  );
}