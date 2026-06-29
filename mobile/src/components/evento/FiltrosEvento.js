import {
  View
} from 'react-native';

import { Picker }
from '@react-native-picker/picker';

import styles
from '../../styles/FiltrosEventoStyles';

export default function FiltrosEvento({
  modalidade,
  setModalidade,
  local,
  setLocal,
  data,
  setData
}) {
  return (
    <View style={styles.container}>

      <View style={styles.select}>
        <Picker
          selectedValue={modalidade}
          onValueChange={setModalidade}
          dropdownIconColor="#000000"
        >
          <Picker.Item
            label="Modalidade"
            value=""
          />

          <Picker.Item
            label="Futebol"
            value="futebol"
          />

          <Picker.Item
            label="Corrida"
            value="corrida"
          />

          <Picker.Item
            label="Ciclismo"
            value="ciclismo"
          />

          <Picker.Item
            label="Calistenia"
            value="calistenia"
          />
        </Picker>
      </View>

      <View style={styles.select}>
        <Picker
          selectedValue={local}
          onValueChange={setLocal}
          dropdownIconColor="#000000"
        >
          <Picker.Item
            label="Local"
            value=""
          />
          <Picker.Item
            label="Praça do Barão"
            value="Praça do Barão"
          />

          <Picker.Item
            label="Saída do Centro Histórico"
            value="Saída do Centro Histórico"
          />

          <Picker.Item
            label="Centro Histórico"
            value="Centro Histórico"
          />

          <Picker.Item
            label="Quadra do IFMG - Sabará"
            value="Quadra do IFMG - Sabará"
          />
        </Picker>
      </View>

      <View style={styles.select}>
        <Picker
          selectedValue={data}
          onValueChange={setData}
          dropdownIconColor="#000000"
        >
          <Picker.Item
            label="Horário"
            value=""
          />
          <Picker.Item
            label="Manhã"
            value="Manhã"
          />
          <Picker.Item
            label="Tarde"
            value="Tarde"
          />
          <Picker.Item
            label="Noite"
            value="Noite"
          />
        </Picker>
      </View>

    </View>
  );
}