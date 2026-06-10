import { StyleSheet } from 'react-native';

import colors from './StyleColors';

const stylesServidorPublico = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20
    },

    botaoVoltar: {
        marginBottom: 20
    },

    textoVoltar: {
        color: colors.primary,
        fontSize: 16
    },

    icone: {
        fontSize: 70,
        textAlign: 'center',
        marginTop: 20
    },

    titulo: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: 'bold',

        textAlign: 'center',

        marginTop: 10
    },

    formulario: {
        marginTop: 30
    }

});

export default stylesServidorPublico;