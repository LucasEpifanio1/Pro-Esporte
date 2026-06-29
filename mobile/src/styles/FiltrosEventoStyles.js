import {
  StyleSheet
} from 'react-native';

import colors
from './StyleColors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginHorizontal: 20,
    marginBottom: 20
  },

  select: {
    flex: 1,

    backgroundColor:
      colors.primary,

    borderRadius: 15,

    marginHorizontal: 3,

    overflow: 'hidden'
  }
});