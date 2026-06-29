import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import styles from '../../styles/CardEventoStyles';

export default function CardEvento({
  evento,
  onParticipar,
  onDetalhes
}) {
  return (
    <View style={styles.card}>

      <Image
            source={{
                uri: evento.imagem
            }}
            style={styles.imagem}
            
            onError={(e) =>
                console.log(
                'Erro na imagem:',
                evento.titulo,
                evento.imagem,
                e.nativeEvent
                )
            }
       />

      <Text style={styles.titulo}>
        {evento.titulo}
      </Text>

      <Text style={styles.informacao}>
        📍 {evento.local}
      </Text>

      <Text style={styles.informacao}>
        📅 {evento.data}
      </Text>

      <Text style={styles.informacao}>
        ⏰ {evento.horario}
      </Text>

      <Text style={styles.informacao}>
        🏃 {evento.modalidade}
      </Text>

      <Text style={styles.informacao}>
        🎟 {evento.vagas} vagas
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          onDetalhes?.(evento)
        }
      >
        <Text style={styles.textoBotao}>
          Ver detalhes
        </Text>
      </TouchableOpacity>

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