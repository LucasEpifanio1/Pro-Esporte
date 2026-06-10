import { StyleSheet } from 'react-native';

import colors from './StyleColors';

const styles = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: 15
    },

    label: {
        color: colors.text,
        marginBottom: 5,
        fontSize: 14
    },

    input: {
        backgroundColor: colors.card,

        color: colors.text,

        borderRadius: 8,

        paddingHorizontal: 12,
        paddingVertical: 12
    }

});

export default styles;