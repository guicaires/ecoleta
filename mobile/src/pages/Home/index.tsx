import React, { useState, ChangeEvent, useEffect } from 'react';
import { Image, View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

import {styles, pickerStyle} from './styles';

interface ibgeCityResponse {
  nome: string;
}

interface Cities {
  label: string;
  value: string;
}

const Home = () => {
  const navigation = useNavigation();

  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [cities, setCities] = useState<Cities[]>([]);

  useEffect(() => {
    if (selectedUF === '0') return;

    axios
      .get<ibgeCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(res => {
        const citiesNames = res.data.map(city => ({
          label: city.nome,
          value: city.nome
        }));

        setCities(citiesNames);
      })
  }, [selectedUF]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {selectedUF, selectedCity});
  }

  return (
    <ImageBackground
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
      source={require('../../assets/home-background.png')}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos!</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View>
        <Picker
          selectedValue={selectedUF}
          onValueChange={setSelectedUF}
          style={pickerStyle}
        >
          <Picker.Item label="Selecione um estado" value="0" />
          <Picker.Item label='Acre' value='AC' />
          <Picker.Item label='Alagoas' value='AL' />
          <Picker.Item label='Amapá' value='AP' />
          <Picker.Item label='Amazonas' value='AM' />
          <Picker.Item label='Bahia' value='BA' />
          <Picker.Item label='Ceará' value='CE' />
          <Picker.Item label='Distrito Federal' value='DF' />
          <Picker.Item label='Espírito Santo' value='ES' />
          <Picker.Item label='Goiás' value='GO' />
          <Picker.Item label='Maranhão' value='MA' />
          <Picker.Item label='Mato Grosso' value='MT' />
          <Picker.Item label='Mato Grosso do Sul' value='MS' />
          <Picker.Item label='Minas Gerais' value='MG' />
          <Picker.Item label='Pará' value='PA' />
          <Picker.Item label='Paraíba' value='PB' />
          <Picker.Item label='Paraná' value='PR' />
          <Picker.Item label='Pernambuco' value='PE' />
          <Picker.Item label='Piauí' value='PI' />
          <Picker.Item label='Rio de Janeiro' value='RJ' />
          <Picker.Item label='Rio Grande do Norte' value='RN' />
          <Picker.Item label='Rio Grande do Sul' value='RS' />
          <Picker.Item label='Rondônia' value='RO' />
          <Picker.Item label='Roraima' value='RR' />
          <Picker.Item label='Santa Catarina' value='SC' />
          <Picker.Item label='São Paulo' value='SP' />
          <Picker.Item label='Sergipe' value='SE' />
          <Picker.Item label='Tocantis' value='TO' />
        </Picker>
        <Picker
          selectedValue={selectedCity}
          onValueChange={setSelectedCity}
          style={pickerStyle}
        >
          <Picker.Item label="Selecione uma cidade" value="0" />
          {cities.map(({ label }) => (
            <Picker.Item key={String(label)} label={label} value={label} />
          ))}
        </Picker>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name='arrow-right' color='#fff' size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>

    </ImageBackground>
  );
};



export default Home;
