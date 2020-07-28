import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles' ;
import api from '../../services/api';

interface Params {
  point_id: number;
}

interface Point {
  name: string;
  image: string;
  email: string;
  whatsapp: string;
  uf: string;
  city: string;
  items: {
    title: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [point, setPoint] = useState<Point>({} as Point);

  const routeParams = route.params as Params;

  useEffect(() => {
    const { point_id } = routeParams;

    api.get(`points/${point_id}`).then(res => setPoint(res.data));
  }, []);

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  if (!point.name) return null;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' color='#34CB79' size={20} />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: point.image }}
        />
        <Text style={styles.pointName}>{point.name}</Text>
        <Text style={styles.pointItems}>
          {point.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {point.city + ', ' + point.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name='whatsapp' size={20} color='#FFF' />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name='mail' size={20} color='#FFF' />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

export default Detail;
