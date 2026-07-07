import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import {
  obterUsuario,
  logoutLocal
} from '../../storage/authStorage';

import { formatarTipoConta } from '../../utils/formatters';
import Rodape from '../../components/Rodape';
import styles from '../../styles/TelaPerfilStyles';

export default function TelaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregar() {
      const sessao = await obterUsuario();
      setUsuario(sessao);
    }

    carregar();
  }, []);

  const sair = async () => {
    await logoutLocal();
    navigation.replace('TelaBoasVindas');
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>

          <Text style={styles.nome}>
            {usuario?.nome || 'Carregando...'}
          </Text>
        </View>

        <Text style={styles.secaoTitulo}>
          Informações Pessoais
        </Text>

        <View style={styles.perfilCard}>
          <Text style={styles.cardIcon}>🛡️</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>
              Tipo de Conta
            </Text>
            <Text style={styles.cardValor}>
              {formatarTipoConta(usuario?.tipo)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnLogout}
          onPress={sair}
          activeOpacity={0.8}
        >
          <Text style={styles.btnLogoutTexto}>
            ↪ Sair da Conta
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Rodape
        navigation={navigation}
        telaAtiva="perfil"
      />
    </SafeAreaView>
  );
}
