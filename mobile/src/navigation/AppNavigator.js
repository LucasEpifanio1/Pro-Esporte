import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Telas de login
import TelaBoasVindas from '../screens/TelaBoasVindas';
import TelaCidadao from '../screens/auth/TelaCidadao';
import TelaTipoCriadorEvento from '../screens/auth/TelaTipoCriadorEvento';
import TelaEmpresa from '../screens/auth/TelaEmpresa';
import TelaServidorPublico from '../screens/auth/TelaServidorPublico';

//Telas Iniciais
import TelaInicialCidadao from '../screens/telaInicial/TelaInicialCidadao';
import TelaInicialCriadorEventos from '../screens/telaInicial/TelaInicialCriadorEventos';

//Outras Telas
import TelaEventos from '../screens/eventos/TelaEventos';

//Telas do rodapé
import Rodape from '../components/Rodape';
import TelaPerfil from '../screens/perfil/TelaPerfil'

/*
                <Stack.Screen
                    name="TelaInicialCriadorEventos"
                    component={TelaInicialCriadorEventos}
                    options={{headerShown: false}}
                />
*/
const Stack = createNativeStackNavigator();

export default function AppNavigator({
    usuario
}) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={
                    usuario?.logado
                        ? (
                            usuario.tipo === 'cidadao'
                            ? 'TelaInicialCidadao'
                            : 'TelaInicialCriadorEventos'
                        )
                        : 'TelaBoasVindas'
                }
            >
                <Stack.Screen
                    name="TelaBoasVindas"
                    component={TelaBoasVindas}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TelaCidadao"
                    component={TelaCidadao}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TelaTipoCriadorEvento"
                    component={TelaTipoCriadorEvento}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TelaEmpresa"
                    component={TelaEmpresa}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TelaServidorPublico"
                    component={TelaServidorPublico}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TelaInicialCidadao"
                    component={TelaInicialCidadao}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="TelaPerfil"
                    component={TelaPerfil}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="TelaEventos"
                    component={TelaEventos}
                    options={{
                        headerShown: false
                    }}
                />
                        
            </Stack.Navigator>
        </NavigationContainer>
    );
}