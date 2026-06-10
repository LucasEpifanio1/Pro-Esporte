import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import stylesEmpresa from '../../styles/TelaEmpresaStyles';
import BotaoCriarConta from '../../components/BotaoCriarConta';
import CampoTexto from '../../components/CampoTexto';
import BotaoAlternadorAuth from '../../components/BotaoAlternadorAuth';

export default function TelaEmpresa({navigation}) {
    const [modo, setModo] = useState('entrar');
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCNPJ] = useState('');
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
            console.log(cnpj);
            console.log(nome);
            console.log(email);
            console.log(senha);
        }
    }
    return (
        <SafeAreaView style={stylesEmpresa.container}>
            <TouchableOpacity
                style={stylesEmpresa.botaoVoltar}
                onPress={() => navigation.goBack()}
            >
                <Text style={stylesEmpresa.textoVoltar}>
                    ← Voltar
                </Text>
            </TouchableOpacity>
            <Text style={stylesEmpresa.icone}>
                🏤
            </Text>

            <Text style={stylesEmpresa.titulo}>
                Empresa
            </Text>
            <BotaoAlternadorAuth
                modo={modo}
                setModo={setModo}
            />
           <View style={stylesEmpresa.formulario}>

                {
                    modo === 'cadastrar' && (

                        <>
                        <CampoTexto
                            label="Nome da Empresa"
                            placeholder="Ex: Prefeitura Municipal de Sabará"
                            value={nome}
                            onChangeText={setNome} />
                            <CampoTexto
                                label="Telefone"
                                placeholder="(00) 00000-0000"
                                value={telefone}
                                onChangeText={setTelefone}
                                keyboardType="phone-pad" />
                                <CampoTexto
                                label="CNPJ"
                                placeholder="00.000.000/0000-00"
                                value={cnpj}
                                onChangeText={setCNPJ}
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