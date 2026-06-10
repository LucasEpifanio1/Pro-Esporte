import { StyleSheet } from 'react-native';

import colors from './StyleColors';

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',

        alignSelf: 'center',

        backgroundColor: colors.card,

        borderRadius: 10,

        overflow: 'hidden',

        marginVertical: 20
    },

    botao: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },

    botaoAtivo: {
        backgroundColor: colors.primary
    },

    texto: {
        color: colors.text,
        fontWeight: 'bold'
    },

    textoAtivo: {
        color: '#000'
    }

});

export default styles;