import {
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

import CardEvento
from '../../components/evento/CardEvento';

import FiltrosEvento
from '../../components/evento/FiltrosEvento';

import TabsEventos
from '../../components/evento/TabsEventos';

import Rodape
from '../../components/Rodape';

import {
  listarEventos
} from '../../services/eventoService';

import globalStyles
from '../../styles/global';

import styles
from '../../styles/TelaEventosStyles';

export default function TelaEventos({
  navigation
}) {
  const [eventos, setEventos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [erro, setErro] =
    useState(null);

  const [modalidade,
    setModalidade] =
      useState('');

  const [local,
    setLocal] =
      useState('');

  const [data,
    setData] =
      useState('');

  const [abaAtiva,
    setAbaAtiva] =
      useState('Todos');

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {
      const dados =
        await listarEventos();

      setEventos(dados);
    }
    catch (erro) {
      console.log(erro);

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
      <Text style={styles.titulo}>
        Eventos
      </Text>

      <FiltrosEvento
        modalidade={modalidade}
        setModalidade={setModalidade}
        local={local}
        setLocal={setLocal}
        data={data}
        setData={setData}
      />

      <TabsEventos
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
      />

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
        showsVerticalScrollIndicator={
          false
        }
      />

      <Rodape
        navigation={navigation}
        telaAtiva="eventos"
      />
    </SafeAreaView>
  );
}