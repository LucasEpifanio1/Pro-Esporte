import {
  StyleSheet
} from 'react-native';

import colors
from './StyleColors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',

    justifyContent:
      'space-around',

    marginBottom: 20
  },

  texto: {
    color: '#888',

    fontSize: 16,

    paddingBottom: 10
  },

  textoAtivo: {
    color: colors.primary,

    fontWeight: 'bold',

    borderBottomWidth: 2,

    borderBottomColor:
      colors.primary
  }
});