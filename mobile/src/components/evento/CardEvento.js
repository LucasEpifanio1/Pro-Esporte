import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import styles from '../../styles/CardEventoStyles';

export default function CardEvento({
  evento,
  onParticipar
}) {
  return (
    <View style={styles.card}>

      <Text style={styles.titulo}>
        {evento.titulo}
      </Text>

      <Text>
        Modalidade:
        {' '}
        {evento.modalidade}
      </Text>

      <Text>
        Local:
        {' '}
        {evento.local}
      </Text>

      <Text>
        Data:
        {' '}
        {evento.data}
      </Text>

      <Text>
        Horário:
        {' '}
        {evento.horario}
      </Text>

      <Text>
        Vagas:
        {' '}
        {evento.vagas}
      </Text>

      <Text style={styles.descricao}>
        {evento.descricao}
      </Text>

      {
        onParticipar &&
        (
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              onParticipar(
                evento.ID_Evento
              )
            }
          >
            <Text
              style={styles.textoBotao}
            >
              Participar
            </Text>
          </TouchableOpacity>
        )
      }

    </View>
  );
}