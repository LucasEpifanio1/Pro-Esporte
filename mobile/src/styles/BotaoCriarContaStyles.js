import { StyleSheet } from 'react-native';

import colors from './StyleColors';

const styles = StyleSheet.create({

    botao: {
        backgroundColor: colors.primary,

        width: '100%',

        paddingVertical: 15,

        borderRadius: 8,

        alignItems: 'center',

        marginTop: 15
    },

    texto: {
        color: '#000',

        fontWeight: 'bold',

        fontSize: 16
    }

});

export default styles;