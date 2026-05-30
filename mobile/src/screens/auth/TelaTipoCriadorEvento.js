import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardSelecao from '../../components/CardSelecao';
import globalStyles from '../../styles/global';
import stylesCriador from '../../styles/TelaTipoCriadorStyles';

export default function TelaTipoCriadorEvento({navigation}) {
    return (
        <SafeAreaView
            style={[
                globalStyles.container,
                stylesCriador.localContainer
            ]}
        >
            <Text style={stylesCriador.titulo}>
                ProEsporte
            </Text>
            <Text style={stylesCriador.subtitulo}>
                Escolha que tipo
            </Text>
            <CardSelecao
                titulo="Servidor Público"
                icone={<Text style={stylesCriador.emoji}>👨‍💼</Text>}
                onPress={() =>
                    navigation.navigate('TelaServidorPublico')
                }
            />
            <CardSelecao
                titulo="Empresa"
                icone={<Text style={stylesCriador.emoji}>🏤</Text>}
                onPress={() =>
                    navigation.navigate('TelaEmpresa')
                }
            />
        </SafeAreaView>
    );
}