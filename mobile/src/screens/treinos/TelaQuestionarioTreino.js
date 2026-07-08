import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { questions } from '../../data/questionarioTreino';
import colors from '../../styles/StyleColors';
import Styles from '../../styles/global';
import {
  gerarTreino,
  salvarTreinoNoServidor
} from '../../services/treinoService';
import{
  salvarQuestionario,
  salvarTreino
} from '../../database/treinoRepository'


const { width } = Dimensions.get('window');

export default function TelaQuestionarioTreino({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [currentValue, setCurrentValue] = useState('');

  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    // Carregar resposta existente se houver
    const savedAnswer = respostas[question.id];
    if (savedAnswer !== undefined) {
      setCurrentValue(savedAnswer);
    } else {
      setCurrentValue(question.type === 'multiselect' ? [] : '');
    }
  }, [currentIndex]);

  const handleNext = async () => {
    const newRespostas = { ...respostas, [question.id]: currentValue };
    setRespostas(newRespostas);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
        try {
          const fichaTreino = await gerarTreino(newRespostas);
          console.log('Ficha de treino gerada:', fichaTreino);

          await salvarQuestionario(newRespostas);
          await salvarTreino(fichaTreino);
          try{
            await salvarTreinoNoServidor(fichaTreino);
          } catch (erro) {
            console.warn('Treino salvo localmente, mas não sincronizado:', erro);
          }
          console.log('Treino salvo no banco de dados SQLite');

          navigation.replace('TelaDashboardTreino');

        } catch (erro) {
          console.log(erro);
          Alert.alert(
            'Erro',
            'Não foi possível gerar seu treino.'
          );
        }
      }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const isNextDisabled = () => {
    if (question.type === 'options') {
      return !currentValue;
    }
    if (question.type === 'multiselect') {
      return (currentValue?.length || 0) < (question.minSelected || 0);
    }
    if (question.type === 'number' || question.type === 'textarea') {
      return !currentValue && !question.allowUnknown;
    }
    return false;
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'options':
        return (
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  currentValue === option && styles.optionButtonSelected
                ]}
                onPress={() => setCurrentValue(option)}
              >
                <Text style={[
                  styles.optionText,
                  currentValue === option && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'multiselect':
        return (
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = currentValue?.includes(option);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    const newValue = isSelected
                      ? currentValue.filter(item => item !== option)
                      : [...(currentValue || []), option];
                    setCurrentValue(newValue);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case 'number':
        return (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentValue.toString()}
              onChangeText={setCurrentValue}
              keyboardType="numeric"
              placeholder={question.placeholder}
              placeholderTextColor="#666"
            />
            {question.unit && <Text style={styles.unitText}>{question.unit}</Text>}
          </View>
        );

      case 'textarea':
        return (
          <View style={styles.textareaContainer}>
            {question.quickFill && (
              <TouchableOpacity
                style={styles.quickFillButton}
                onPress={() => setCurrentValue(question.quickFill.value)}
              >
                <Text style={styles.quickFillText}>{question.quickFill.label}</Text>
              </TouchableOpacity>
            )}
            <TextInput
              style={styles.textarea}
              value={currentValue}
              onChangeText={setCurrentValue}
              multiline
              numberOfLines={4}
              placeholder={question.placeholder}
              placeholderTextColor="#666"
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backHeaderBtn}>
          <Text style={styles.backHeaderText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          Pergunta {currentIndex + 1} de {totalQuestions}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {question.image && (
          <Image
            source={question.image}
            style={styles.questionImage}
            contentFit="contain"
          />
        )}

        <Text style={styles.questionTitle}>{question.title}</Text>

        {renderQuestionInput()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, isNextDisabled() && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={isNextDisabled()}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === totalQuestions - 1 ? 'Finalizar Questionário' : 'Próxima'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
  },
  backHeaderBtn: {
    marginBottom: 15,
  },
  backHeaderText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#1F2937',
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#1F2937',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#000000',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#374151',
  },
  input: {
    flex: 1,
    height: 55,
    color: '#FFFFFF',
    fontSize: 18,
  },
  unitText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textareaContainer: {
    gap: 12,
  },
  textarea: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#374151',
  },
  quickFillButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  quickFillText: {
    color: colors.primary,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  nextButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#4B5563',
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});