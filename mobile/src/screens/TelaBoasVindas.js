import {
  Text
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import CardSelecao from '../components/CardSelecao';

import globalStyles from '../styles/global';
import styles from '../styles/TelaBoasVindasStyles';

export default function TelaBoasVindas({ navigation }) {

  return (

    <SafeAreaView
      style={[
        globalStyles.container,
        styles.localContainer
      ]}
    >

      <Text style={styles.titulo}>
        ProEsporte
      </Text>

      <Text style={styles.subtitulo}>
        Escolha como você quer participar
      </Text>

      <CardSelecao
        titulo="Cidadão"
        descricao="Participe de eventos e treine na sua cidade"
        icone={<Text style={styles.emoji}>👤</Text>}

        onPress={() =>
          navigation.navigate('TelaCidadao')
        }
      />

      <CardSelecao
        titulo="Criador de Eventos"
        descricao="Organize e gerencie eventos esportivos"
        icone={<Text style={styles.emoji}>📅</Text>}

        onPress={() =>
          navigation.navigate('TelaTipoCriadorEvento')
        }
      />

    </SafeAreaView>
  );
}