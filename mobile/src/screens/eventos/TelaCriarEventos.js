import { Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import FormEvento from '../../components/evento/FormEvento';
import Rodape from '../../components/Rodape';

import { criarEvento } from '../../services/eventoService';
import { obterUsuario } from '../../storage/authStorage';

import globalStyles from '../../styles/global';

export default function TelaCriarEventos({
    navigation
}) {
    const [loading, setLoading] = useState(false);

    async function criar(dadosFormulario) {

        try {
            setLoading(true);

            const usuario = await obterUsuario();

            const dadosEvento = {
                ...dadosFormulario
            };

            if (usuario.tipo === 'empresa') {
                dadosEvento.FK_Empresa =
                    usuario.identificador;
            }

            if (
                usuario.tipo ===
                'servidor_publico'
            ) {
                dadosEvento.FK_Servidor =
                    usuario.identificador;
            }

            await criarEvento(dadosEvento);

            Alert.alert(
                'Sucesso',
                'Evento criado com sucesso!'
            );

            navigation.replace(
                'TelaEventos'
            );

        }
        catch (erro) {

            console.log(erro);

            Alert.alert(
                'Erro',
                'Não foi possível criar o evento.'
            );
        }
        finally {
            setLoading(false);
        }

    }

    return (

        <SafeAreaView
            style={globalStyles.container}
        >

            <ScrollView>

                <FormEvento
                    onSubmit={criar}
                    loading={loading}
                />

            </ScrollView>

            <Rodape
                navigation={navigation}
                telaAtiva="criar"
            />

        </SafeAreaView>

    );

}