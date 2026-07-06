import {
  Text,
  FlatList,
  ActivityIndicator,
  Alert
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
  listarEventos,
  participarEvento
} from '../../services/eventoService';

import { obterUsuario } from '../../storage/authStorage';

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

  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    carregarEventos();
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const usuario = await obterUsuario();

    setTipoUsuario(usuario?.tipo);
  }
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

  async function handleParticipar(idEvento) {
    try {
      const usuario = await obterUsuario();

      if (!usuario || usuario.tipo !== 'cidadao') {
        Alert.alert(
          'Acesso Negado',
          'Apenas cidadãos podem se inscrever em eventos.'
        );
        return;
      }

      await participarEvento({
        idCidadao: usuario.identificador,
        idEvento
      });

      Alert.alert(
        'Inscrição Realizada',
        'Você se inscreveu com sucesso no evento!'
      );
    } catch (erro) {
      Alert.alert(
        'Erro na Inscrição',
        erro.message || 'Não foi possível realizar a inscrição.'
      );
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
            onParticipar={handleParticipar}
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
        tipoUsuario={tipoUsuario}
      />
    </SafeAreaView>
  );
}