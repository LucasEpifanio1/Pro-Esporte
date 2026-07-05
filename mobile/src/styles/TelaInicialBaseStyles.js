import { StyleSheet } from 'react-native';

const AMARELO = '#FBBF24';
const PRETO = '#000000';
const LINHA_DIAGONAL = '#101828';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: PRETO,
    padding: 0
  },

  gradiente: {
    ...StyleSheet.absoluteFillObject
  },

  linhaDiagonal: {
    position: 'absolute',
    width: 12,
    height: '140%',
    backgroundColor: LINHA_DIAGONAL,
    top: '-20%',
    left: '50%',
    marginLeft: -6,
    transform: [{ rotate: '43deg' }],
    zIndex: 1
  },

  cardEventos: {
    position: 'absolute',
    top: 80,
    left: 24,
    zIndex: 2
  },

  cardTreinos: {
    position: 'absolute',
    bottom: 110,
    right: 24,
    zIndex: 2,
    alignItems: 'flex-end'
  }
});

export { AMARELO, PRETO };
