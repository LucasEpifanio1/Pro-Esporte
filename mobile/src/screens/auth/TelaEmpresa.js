import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import stylesLoginEntrar from '../../styles/TelaLoginEntrar';
import BotaoCriarConta from '../../components/BotaoCriarConta';
import CampoTexto from '../../components/CampoTexto';
import BotaoAlternadorAuth from '../../components/BotaoAlternadorAuth';
import { cadastrarEmpresa } from '../../services/api';
import { loginUsuario } from '../../services/api';

export default function TelaEmpresa({navigation}) {
    const [modo, setModo] = useState('entrar');
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(){
        if (modo === 'entrar'){
            console.log('Login');
            try{
                const respostaLoginServidor = await loginUsuario({
                    email,
                    senha
                });
                console.log(respostaLoginServidor);
            } catch(erro){
                console.log(erro);
            }
        }
        if (modo === 'cadastrar'){
            console.log('Cadastro');
            try{
                const respostaEmpresa = await cadastrarEmpresa({
                    cnpj,
                    nome,
                    email,
                    senha
                });
                console.log(respostaEmpresa);
            }catch(erro){
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
                    source={require('../../assets/icons/iconEmpresa.png')}
                    style={stylesLoginEntrar.icone}
                />
            </View>

            <Text style={stylesLoginEntrar.titulo}>
                Empresa
            </Text>
            <BotaoAlternadorAuth
                modo={modo}
                setModo={setModo}
            />
           <View style={stylesLoginEntrar.formulario}>

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