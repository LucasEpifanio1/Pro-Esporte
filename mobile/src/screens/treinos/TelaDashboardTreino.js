import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../styles/StyleColors';

export default function TelaDashboardTreino() {
  const navigation = useNavigation();

  const handleMinhaRotinaPress = () => {
    navigation.navigate('TelaRotinaTreino');
  };

  const handleEvolucaoPress = () => {
    navigation.navigate('TelaEvolucao');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard de Treinos</Text>
        <Text style={styles.subtitle}>Seu espaço para evolução física</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={handleMinhaRotinaPress}>
          <MaterialCommunityIcons name="dumbbell" size={40} color={colors.primary} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Minha Rotina</Text>
          <Text style={styles.cardDescription}>Acesse sua rotina de treinos personalizada</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleEvolucaoPress}>
          <MaterialCommunityIcons name="chart-line" size={40} color={colors.primary} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Evolução</Text>
          <Text style={styles.cardDescription}>Acompanhe seu progresso e objetivos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
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
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
