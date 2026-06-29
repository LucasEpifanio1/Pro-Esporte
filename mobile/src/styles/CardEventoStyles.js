import {
  StyleSheet
} from 'react-native';

import colors from './StyleColors';

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',

    margin: 15,

    padding: 20,

    borderRadius: 20,

    elevation: 5
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  descricao: {
    marginTop: 10,
    marginBottom: 15
  },

  botao: {
    backgroundColor:
      colors.primary,

    padding: 12,

    borderRadius: 12,

    alignItems: 'center'
  },

  textoBotao: {
    fontWeight: 'bold'
  }
});