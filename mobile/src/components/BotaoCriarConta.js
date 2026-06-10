import { TouchableOpacity, Text } from 'react-native';

import styles from '../styles/BotaoCriarContaStyles';

export default function BotaoCriarConta({
    titulo,
    onPress
}) {

    return (
        <TouchableOpacity
            style={styles.botao}
            onPress={onPress}
        >
            <Text style={styles.texto}>
                {titulo}
            </Text>
        </TouchableOpacity>
    );
}