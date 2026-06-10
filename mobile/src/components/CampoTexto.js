import { View, Text, TextInput } from 'react-native';

import styles from '../styles/CampoTextoStyles';

export default function CampoTexto({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default'
}) {

    return (
        <View style={styles.container}>

            <Text style={styles.label}>
                {label}
            </Text>

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />

        </View>
    );
}