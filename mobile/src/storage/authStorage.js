import AsyncStorage from '@react-native-async-storage/async-storage'
import { limparDadosLocaisDaConta } from '../database/treinoRepository';

export async function salvarUsuario(usuario) {
    try {
        await AsyncStorage.setItem(
            'usuario',
            JSON.stringify(usuario)
        );
    } catch (erro) {
        console.log(erro);
    }
}

export async function obterUsuario() {
    try {

        const usuario =
            await AsyncStorage.getItem(
                'usuario'
            );

        return usuario
            ? JSON.parse(usuario)
            : null;

    } catch (erro) {
        console.log(erro);
    }
}

export async function logoutLocal() {
    try {
        await AsyncStorage.removeItem(
            'usuario'
        );
        await limparDadosLocaisDaConta();
    } catch (erro) {
        console.log(erro);
    }
}
