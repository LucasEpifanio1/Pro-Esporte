import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../styles/StyleColors';
import { obterTreino } from '../../database/treinoRepository';

export default function TelaEvolucao() {
  const [treino, setTreino] = useState(null);

  useEffect(() => {
    async function carregar() {
      const dados = await obterTreino();
      setTreino(dados);
    }
    carregar();
  }, []);

  const totalExercicios = treino?.dias?.reduce(
    (soma, dia) => soma + (dia.exercicios?.length || 0),
    0
  ) || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Evolução</Text>

        {!treino ? (
          <Text style={styles.emptyText}>
            Você ainda não tem uma rotina ativa para acompanhar.
          </Text>
        ) : (
          <>
            <View style={styles.card}>
              <MaterialCommunityIcons name="chart-line" size={32} color={colors.primary} />
              <Text style={styles.cardTitle}>Rotina Atual</Text>
              <Text style={styles.cardText}>Perfil: {treino.perfilIdentificado}</Text>
              <Text style={styles.cardText}>Objetivo: {treino.objetivo}</Text>
              <Text style={styles.cardText}>Divisão: {treino.divisao}</Text>
            </View>

            <View style={styles.card}>
              <MaterialCommunityIcons name="dumbbell" size={32} color={colors.primary} />
              <Text style={styles.cardTitle}>Resumo</Text>
              <Text style={styles.cardText}>{treino.dias?.length || 0} dia(s) de treino</Text>
              <Text style={styles.cardText}>{totalExercicios} exercícios no total</Text>
            </View>

            <Text style={styles.footerNote}>
              Em breve: acompanhamento de séries e repetições concluídas por treino.
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  footerNote: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
});