import {View, Text, TouchableOpacity, Image} from 'react-native';
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
            <TouchableOpacity
                style={stylesCriador.botaoVoltar}
                onPress={() => navigation.goBack()}
            >
                <Text style={stylesCriador.textoVoltar}>
                    ← Voltar
                </Text>
            </TouchableOpacity>

            <Text style={stylesCriador.titulo}>
                ProEsporte
            </Text>
            <Text style={stylesCriador.subtitulo}>
                Escolha que tipo
            </Text>
            <CardSelecao
                titulo="Servidor Público"
                icone={
                <Image
                    source={require('../../assets/icons/iconFuncionario.png')}
                    style={stylesCriador.icone}
                />
                }
                onPress={() =>
                    navigation.navigate('TelaServidorPublico')
                }
            />
            <CardSelecao
                titulo="Empresa"
                icone={
                <Image
                    source={require('../../assets/icons/iconEmpresa.png')}
                    style={stylesCriador.icone}
                />
                }
                onPress={() =>
                    navigation.navigate('TelaEmpresa')
                }
            />
        </SafeAreaView>
    );
}