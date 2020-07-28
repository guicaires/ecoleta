import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';

import styles from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('items').then(res => {
      setItems(res.data);
    });
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

  const handleNavigateToDetail = () =>{
    navigation.navigate('Detail');
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
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -12.977294,
              longitude: -38.454218,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <Marker
              style={styles.mapMarker}
              onPress={handleNavigateToDetail}
              coordinate={{ latitude: -12.977294, longitude: -38.454218 }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image
                  style={styles.mapMarkerImage}
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzaYnUlDZGm9lj6E59De86z4yELnKSPh5_qw&usqp=CAU' }}
                />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
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
