import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  blocoSeletores: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  seletorItem: {
    flex: 1
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  inputSeletor: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff'
  },
  textoSeletor: {
    color: '#333'
  }
});

export default styles;
