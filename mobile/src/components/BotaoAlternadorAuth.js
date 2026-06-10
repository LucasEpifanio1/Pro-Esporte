import { View, TouchableOpacity, Text } from 'react-native';

import styles from '../styles/BotaoAlternadorAuthStyles';

export default function BotaoAlternadorAuth({
    modo,
    setModo
}) {

    return (

        <View style={styles.container}>

            <TouchableOpacity
                style={[
                    styles.botao,
                    modo === 'entrar' && styles.botaoAtivo
                ]}
                onPress={() => setModo('entrar')}
            >
                <Text
                    style={[
                        styles.texto,
                        modo === 'entrar' && styles.textoAtivo
                    ]}
                >
                    Entrar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.botao,
                    modo === 'cadastrar' && styles.botaoAtivo
                ]}
                onPress={() => setModo('cadastrar')}
            >
                <Text
                    style={[
                        styles.texto,
                        modo === 'cadastrar' && styles.textoAtivo
                    ]}
                >
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View>

    );
}