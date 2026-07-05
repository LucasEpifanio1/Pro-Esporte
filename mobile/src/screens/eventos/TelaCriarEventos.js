import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import {
    SafeAreaView
} from 'react-native-safe-area-context';

import Rodape from '../../components/Rodape';

import globalStyles from '../../styles/global';
import styles from '../../styles/TelaCriarEventosStyles';

export default function TelaCriarEventos({
    navigation
}) {
    return (
        <SafeAreaView
            style={globalStyles.container}
        >
            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Text style={styles.voltar}>
                        ← Voltar
                    </Text>
                </TouchableOpacity>

                <Text style={globalStyles.title}>
                    Criar Novo Evento
                </Text>

            </View>

            <View style={styles.content}>

                <Text style={styles.placeholder}>
                    Formulário de criação de eventos será implementado aqui.
                </Text>

            </View>

            <Rodape
                navigation={navigation}
                telaAtiva=""
            />

        </SafeAreaView>
    );
}