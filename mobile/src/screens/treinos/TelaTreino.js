import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { existeTreino } from '../../database/treinoRepository';

export default function TelaTreinos({ navigation }) {

    useEffect(() => {
        verificarTreino();
    }, []);

    async function verificarTreino() {

        const possuiTreino = await existeTreino();

        if (possuiTreino) {
            navigation.replace('TelaDashboardTreino');
        } else {
            navigation.replace('TelaQuestionarioTreino');
        }

    }

    return (
        <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <ActivityIndicator size="large"/>
        </View>
    );

}