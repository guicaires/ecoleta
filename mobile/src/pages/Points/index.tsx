import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';

import styles from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Points {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Points[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

  const navigation = useNavigation();

  useEffect(() => {
    api.get('items').then(res => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        uf: 'BA',
        city: 'Vera Cruz',
        items: [1, 2],
      }
    }).then(res => setPoints(res.data));
  },[]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status != 'granted') {
        Alert.alert(
          'Oooops...',
          'Precisamos da sua permissão para obter a localização',
          [{
            text: 'Ok',
            onPress: loadPosition
          }]
        );
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      return setSelectedItems(filteredItems);
    }

    return setSelectedItems([...selectedItems, id]);
  }

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  const handleNavigateToDetail = (id: number) =>{
    navigation.navigate('Detail', { id });
  }

  return(
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' color='#34CB79' size={20} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo!</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          { initialPosition[0] != 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(({id, name, image, latitude, longitude}) => (
                <Marker
                  key={String(id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(id)}
                  coordinate={{latitude, longitude}}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{ uri: image }}
                    />
                    <Text style={styles.mapMarkerTitle}>{name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          ) }
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]}
              onPress={() => {handleSelectItem(item.id)}}
              activeOpacity={0.4}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>
    </>
  );
}

export default Points;
