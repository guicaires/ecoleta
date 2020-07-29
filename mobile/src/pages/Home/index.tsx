import React, { useState, ChangeEvent, useEffect } from 'react';
import { Image, View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

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
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={setSelectedUF}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Estado', value: '0' }}
          items={[
            { label: 'AC', value: 'AC' },
            { label: 'AL', value: 'AL' },
            { label: 'AP', value: 'AP' },
            { label: 'AM', value: 'AM' },
            { label: 'BA', value: 'BA' },
            { label: 'CE', value: 'CE' },
            { label: 'DF', value: 'DF' },
            { label: 'ES', value: 'ES' },
            { label: 'GO', value: 'GO' },
            { label: 'MA', value: 'MA' },
            { label: 'MT', value: 'MT' },
            { label: 'MS', value: 'MS' },
            { label: 'MG', value: 'MG' },
            { label: 'PA', value: 'PA' },
            { label: 'PB', value: 'PB' },
            { label: 'PR', value: 'PR' },
            { label: 'PE', value: 'PE' },
            { label: 'PI', value: 'PI' },
            { label: 'RJ', value: 'RJ' },
            { label: 'RN', value: 'RN' },
            { label: 'RS', value: 'RS' },
            { label: 'RO', value: 'RO' },
            { label: 'RR', value: 'RR' },
            { label: 'SC', value: 'SC' },
            { label: 'SP', value: 'SP' },
            { label: 'SE', value: 'SE' },
            { label: 'TO', value: 'TO' },
          ]}
        />
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={setSelectedCity}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Cidade', value: '0' }}
          items={cities}
        />
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
