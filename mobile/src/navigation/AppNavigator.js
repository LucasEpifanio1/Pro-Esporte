import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaCidadao from '../screens/auth/TelaCidadao';
import TelaTipoCriadorEvento from '../screens/auth/TelaTipoCriadorEvento';
import TelaEmpresa from '../screens/auth/TelaEmpresa';
import TelaServidorPublico from '../screens/auth/TelaServidorPublico';
import TelaBoasVindas from '../screens/TelaBoasVindas';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='TelaBoasVindas'
            >
                <Stack.Screen
                    name="TelaBoasVindas"
                    component={TelaBoasVindas}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TelaCidadao"
                    component={TelaCidadao}
                />
                <Stack.Screen
                    name="TelaTipoCriadorEvento"
                    component={TelaTipoCriadorEvento}
                />
                <Stack.Screen
                    name="TelaEmpresa"
                    component={TelaEmpresa}
                />
                <Stack.Screen
                    name="TelaServidorPublico"
                    component={TelaServidorPublico}
                />
            
            </Stack.Navigator>
        </NavigationContainer>
    );
}