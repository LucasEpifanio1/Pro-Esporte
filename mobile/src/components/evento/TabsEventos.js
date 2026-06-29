import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import styles
from '../../styles/TabsEventosStyles';

export default function TabsEventos({
  abaAtiva,
  setAbaAtiva
}) {
  const abas = [
    'Todos',
    'Meus Eventos',
    'Passados'
  ];

  return (
    <View style={styles.container}>
      {
        abas.map((aba) => (
          <TouchableOpacity
            key={aba}
            onPress={() =>
              setAbaAtiva(aba)
            }
          >
            <Text
              style={[
                styles.texto,
                abaAtiva === aba &&
                  styles.textoAtivo
              ]}
            >
              {aba}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}