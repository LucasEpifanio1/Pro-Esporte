import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import stylesLoginEntrar from '../../styles/TelaLoginEntrar';
import BotaoCriarConta from '../../components/BotaoCriarConta';
import CampoTexto from '../../components/CampoTexto';
import BotaoAlternadorAuth from '../../components/BotaoAlternadorAuth';

export default function TelaCidadao({navigation}) {
    const [modo, setModo] = useState('entrar');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit(){
        if (modo === 'entrar'){
            console.log('Login');
            console.log(email);
            console.log(senha);
        }
        if (modo === 'cadastrar'){
            console.log('Cadastro');
            console.log(nome);
            console.log(email);
            console.log(senha);
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