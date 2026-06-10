import { StyleSheet } from 'react-native';

import colors from './StyleColors';

const stylesCriador = StyleSheet.create({

  localContainer: {
    justifyContent: 'center'
  },

  titulo: {
    color: colors.primary,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },

  subtitulo: {
    color: colors.textSecondary,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50
  },

  icone: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },

  botaoVoltar: {
    marginBottom: 20
  },

  textoVoltar: {
    color: colors.primary,
    fontSize: 16
  }

});

export default stylesCriador;