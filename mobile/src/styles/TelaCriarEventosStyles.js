import { StyleSheet } from 'react-native';
import colors from './StyleColors';

export default StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },

    voltar: {
        color: colors.primary,
        fontSize: 18,
        marginRight: 15
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    placeholder: {
        color: colors.text,
        fontSize: 16,
        textAlign: 'center'
    }
});