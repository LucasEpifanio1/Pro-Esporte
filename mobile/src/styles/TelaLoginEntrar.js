import { StyleSheet } from 'react-native';

import colors from './StyleColors';

const stylesLoginEntrar = StyleSheet.create({

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

    containerIcone: {
        width: 95,
        height: 95,
        backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },

    icone: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
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

export default stylesLoginEntrar;