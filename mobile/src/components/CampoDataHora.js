import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import styles from '../styles/CampoTextoStyles';

export default function CampoDataHora({
    label,
    valor,
    placeholder,
    onPress
}) {

    return (
        <View style={styles.container}>

            <Text style={styles.label}>
                {label}
            </Text>

            <TouchableOpacity
                style={styles.input}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Text
                    style={{
                        color: valor ? '#000' : '#999'
                    }}
                >
                    {valor || placeholder}
                </Text>

            </TouchableOpacity>

        </View>
    );
}