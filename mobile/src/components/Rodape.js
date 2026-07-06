import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';


import styles from '../styles/RodapeStyles';


export default function Rodape({
  navigation,
  telaAtiva,
  tipoUsuario
}) {

  console.log('Rodape - tipoUsuario:', tipoUsuario);
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
        onPress={() => {
            if (tipoUsuario === 'cidadao') {
                navigation.navigate('TelaTreinos');
            } else {
                navigation.navigate('TelaCriarEventos');
            }
        }}
      >
        <Text style={styles.texto}>
          {
            tipoUsuario === 'cidadao'
                ? 'Treinos'
                : 'Criar'
          }
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