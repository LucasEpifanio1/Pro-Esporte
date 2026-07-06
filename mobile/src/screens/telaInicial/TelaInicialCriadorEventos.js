import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import CardHome from '../../components/CardHome';
import Rodape from '../../components/Rodape';

import styles, { AMARELO, PRETO } from '../../styles/TelaInicialBaseStyles';

export default function TelaInicialCriadorEventos({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={[AMARELO, AMARELO, PRETO, PRETO]}
        locations={[0, 0.5, 0.5, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.gradiente}
      />

      <View style={styles.linhaDiagonal} />

      <View style={styles.cardSuperior}>
        <CardHome
          titulo="Eventos"
          descricao="Gerencie os eventos criados por você"
          variant="eventos"
          onPress={() =>
            navigation.navigate('TelaEventos')
          }
        />
      </View>

      <View style={styles.cardInferior}>
        <CardHome
          titulo="Criar Evento"
          descricao="Organize e gerencie novos eventos esportivos"
          variant="treinos"
          onPress={() =>
            navigation.navigate('TelaCriarEventos')
          }
        />
      </View>

      <Rodape
        navigation={navigation}
        telaAtiva="inicio"
        tipoUsuario="criador_eventos"
      />
    </SafeAreaView>
  );
}
