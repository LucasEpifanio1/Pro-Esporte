import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import stylesLoginEntrar from '../../styles/TelaLoginEntrar';
import BotaoCriarConta from '../../components/BotaoCriarConta';
import CampoTexto from '../../components/CampoTexto';
import BotaoAlternadorAuth from '../../components/BotaoAlternadorAuth';
import { cadastrarCidadao } from '../../services/api';
import { loginUsuario } from '../../services/api';
import {salvarUsuario, obterUsuario} from '../../storage/authStorage';
import {TelaInicialCidadao} from '../../screens/telaInicial/TelaInicialCidadao';
import { buscarRotinaDoServidor } from '../../services/treinoService';
import { salvarTreino } from '../../database/treinoRepository';

export default function TelaCidadao({navigation}) {
    const [modo, setModo] = useState('entrar');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(){
        if (modo === 'entrar'){
            console.log('Login');
            try{
                const respostaLogin = await loginUsuario({
                    email,
                    senha
                });
                await salvarUsuario({
                    logado: true,
                    ... respostaLogin
                });
                // Servidor é a fonte única da verdade: sincroniza o treino
                // salvo no MySQL para o SQLite local do aparelho.
                if (respostaLogin.tipo === 'cidadao') {
                    try {
                        const treinoDoServidor = await buscarRotinaDoServidor(
                            respostaLogin.identificador
                        );

                        if (treinoDoServidor) {
                            await salvarTreino(treinoDoServidor);
                        }
                    } catch (erroSync) {
                        console.warn(
                            'Não foi possível sincronizar o treino do servidor:',
                            erroSync
                        );
                    }
                }

                const sessao = await obterUsuario();
                console.log('Sessão salva:', sessao);
                navigation.replace('TelaInicialCidadao');
            } catch(erro){
                console.log(erro);
            }
        }
        if (modo === 'cadastrar'){
            console.log('Cadastro');
            try{
                const resposta =  await cadastrarCidadao({
                    nome,
                    email,
                    senha
                });
                console.log(resposta);
            } catch (erro){
                console.log(erro);
            }
        }
    }
    return (
        <SafeAreaView style={stylesLoginEntrar.container}>
            <TouchableOpacity
                style={stylesLoginEntrar.botaoVoltar}
                onPress={() => navigation.goBack()}
            >
                <Text style={stylesLoginEntrar.textoVoltar}>
                    ← Voltar
                </Text>
            </TouchableOpacity>
            <View style={stylesLoginEntrar.containerIcone}>
                <Image
                    source={require('../../assets/icons/iconCidadao.png')}
                    style={stylesLoginEntrar.icone}
                />
            </View>

            <Text style={stylesLoginEntrar.titulo}>
                Cidadão
            </Text>
            <BotaoAlternadorAuth
                modo={modo}
                setModo={setModo}
            />
           <View style={stylesLoginEntrar.formulario}>

                {
                    modo === 'cadastrar' && (
                        <CampoTexto
                            label="Nome Completo"
                            placeholder="Ex: João Silva"
                            value={nome}
                            onChangeText={setNome}
                        />
                    )
                }

                <CampoTexto
                    label="Email"
                    placeholder="seu@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <CampoTexto
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    keyboardType="number-pad"
                    secureTextEntry
                />

                <BotaoCriarConta
                    titulo={
                        modo === 'entrar'
                            ? 'Entrar'
                            : 'Criar Conta'
                    }
                    onPress={handleSubmit}
                />

            </View>
        </SafeAreaView>
    );
}