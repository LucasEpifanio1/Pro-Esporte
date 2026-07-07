import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../styles/StyleColors';
import {obterTreino} from '../../database/treinoRepository';

export default function TelaRotinaTreino({navigation}) {
  const [treino, setTreino] = useState(null);
  
  useEffect(() => {

    async function carregarTreino() {
      const dados = await obterTreino();
      console.log('Treino carregado:', dados);
      setTreino(dados);
    }

    carregarTreino();

  }, []);

  const handleMarcarConcluido = () => {
    console.log("Treino concluído");
    // Aqui você pode adicionar lógica de navegação ou feedback ao usuário
  };

  if (!treino) {

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.loadingContainer}>

                <Text style={styles.loadingText}>
                    Você ainda não possui uma rotina.
                </Text>

                <Text style={styles.loadingTextSmall}>
                    Gere um treino respondendo ao questionário.
                </Text>

                <TouchableOpacity
                    style={styles.concluirButton}
                    onPress={() =>
                        navigation.replace('TelaQuestionarioTreino')
                    }
                >

                    <Text style={styles.concluirButtonText}>
                        Gerar treino
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeAreaView>

    );

  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >

            <Text
                style={{
                    color: colors.primary,
                    fontSize: 16,
                    marginBottom: 20
                }}
            >
                ← Voltar
            </Text>

        </TouchableOpacity>
        <View style={styles.header}>
            <Text style={styles.title}>
                Minha Rotina
            </Text>

            <View style={styles.card}>

                <Text style={styles.cardTitle}>
                    {treino.perfilIdentificado}
                </Text>

                <Text style={styles.cardDescription}>
                    Objetivo: {treino.objetivo}
                </Text>

                <Text style={styles.cardDescription}>
                    Divisão: {treino.divisao}
                </Text>

            </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Descrição da Rotina</Text>
          <Text style={styles.cardDescription}>{treino.descricao}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Instruções Gerais</Text>
          <Text style={styles.cardDescription}>{treino.instrucoesGerais}</Text>
        </View>

        {treino.dias.map((dia, index) => (
          <View key={index} style={styles.daySection}>
            <Text style={styles.dayTitle}>{dia.nome}</Text>
            {!dia.exercicios?.length ? (

            <View style={styles.exerciseCard}>

            <Text style={styles.exerciseDescription}>
                {dia.nota || 'Dia de descanso'}
            </Text>

            </View>

            ) : (
                dia.exercicios.map((exercicio, exIndex) => (
                <View key={exIndex} style={styles.exerciseCard}>
                    <Text style={styles.exerciseName}>{exercicio.nome}</Text>
                    <Text style={styles.exerciseDetail}>Séries: {exercicio.series}</Text>
                    <Text style={styles.exerciseDetail}>Repetições: {exercicio.reps}</Text>
                    <Text style={styles.exerciseDetail}>Descanso: {exercicio.descanso}</Text>
                    {!!exercicio.descricao && (
                    <Text style={styles.exerciseDescription}>{exercicio.descricao}</Text>
                    )}
                </View>
                ))
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.concluirButton} onPress={handleMarcarConcluido}>
          <Text style={styles.concluirButtonText}>Marcar treino como concluído</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingTextSmall: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Espaço para o botão flutuante, se houver
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 2,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
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
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  daySection: {
    marginBottom: 25,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  exerciseDetail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  exerciseDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  concluirButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  concluirButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
