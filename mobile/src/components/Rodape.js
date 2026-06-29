import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import styles from '../styles/RodapeStyles';

export default function Rodape({
  navigation,
  telaAtiva
}) {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[
          styles.botao,
          telaAtiva === 'inicio' &&
            styles.botaoAtivo
        ]}
      >
        <Text style={styles.texto}>
          Início
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.botao,
          telaAtiva === 'eventos' &&
            styles.botaoAtivo
        ]}
        onPress={() =>
          navigation.navigate('TelaEventos')
        }
      >
        <Text style={styles.texto}>
          Eventos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
      >
        <Text style={styles.texto}>
          Treinos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.botao,
          telaAtiva === 'perfil' &&
            styles.botaoAtivo
        ]}
        onPress={() =>
          navigation.navigate('TelaPerfil')
        }
      >
        <Text style={styles.texto}>
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}