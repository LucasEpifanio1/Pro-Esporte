import {
  StyleSheet
} from 'react-native';

import colors
from './StyleColors';

export default StyleSheet.create({
  card: {
    backgroundColor: '#000',

    marginHorizontal: 20,
    marginBottom: 20,

    padding: 15,

    borderRadius: 25
  },

  imagem: {
    width: '100%',
    height: 130,

    borderRadius: 15,

    marginBottom: 15
  },

  titulo: {
    color: colors.primary,

    fontSize: 22,

    fontWeight: 'bold',

    marginBottom: 15
  },

  informacao: {
    color: '#fff',

    fontSize: 15,

    marginBottom: 8
  },

  botao: {
    backgroundColor:
      colors.primary,

    marginTop: 15,

    padding: 14,

    borderRadius: 10,

    alignItems: 'center'
  },

  textoBotao: {
    fontWeight: 'bold',

    color: '#000'
  }
});