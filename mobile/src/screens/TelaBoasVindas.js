import {
  Text,
  Image
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
        icone={
          <Image
            source={require('../assets/icons/iconCidadao.png')}
            style={styles.icone}
          />
        }

        onPress={() =>
          navigation.navigate('TelaCidadao')
        }
      />

      <CardSelecao
        titulo="Criador de Eventos"
        descricao="Organize e gerencie eventos esportivos"
        icone={
          <Image
            source={require('../assets/icons/iconEmpresa.png')}
            style={styles.icone}
          />
        }

        onPress={() =>
          navigation.navigate('TelaTipoCriadorEvento')
        }
      />

    </SafeAreaView>
  );
}