import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import stylesServidorPublico from '../../styles/TelaServidorStyles';
import BotaoCriarConta from '../../components/BotaoCriarConta';
import CampoTexto from '../../components/CampoTexto';
import BotaoAlternadorAuth from '../../components/BotaoAlternadorAuth';

export default function TelaServidorPublico({navigation}) {
    const [modo, setModo] = useState('entrar');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCPF] = useState('');
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
            console.log(telefone);
            console.log(cpf);
            console.log(nome);
            console.log(email);
            console.log(senha);
        }
    }
    return (
        <SafeAreaView style={stylesServidorPublico.container}>
            <TouchableOpacity
                style={stylesServidorPublico.botaoVoltar}
                onPress={() => navigation.goBack()}
            >
                <Text style={stylesServidorPublico.textoVoltar}>
                    ← Voltar
                </Text>
            </TouchableOpacity>
            <Text style={stylesServidorPublico.icone}>
                👨‍💼
            </Text>

            <Text style={stylesServidorPublico.titulo}>
                Servidor Público
            </Text>
            <BotaoAlternadorAuth
                modo={modo}
                setModo={setModo}
            />
           <View style={stylesServidorPublico.formulario}>

                {
                    modo === 'cadastrar' && (

                        <>
                        <CampoTexto
                            label="Nome"
                            placeholder="Ex: Francisco José Espínola"
                            value={nome}
                            onChangeText={setNome} />
                            <CampoTexto
                                label="Telefone"
                                placeholder="(00) 00000-0000"
                                value={telefone}
                                onChangeText={setTelefone}
                                keyboardType="phone-pad" />
                                <CampoTexto
                                label="CPF"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChangeText={setCPF}
                                keyboardType="number-pad" />
                                </>
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