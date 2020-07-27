import React from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles' ;

const Detail = () => {
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' color='#34CB79' size={20} />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzaYnUlDZGm9lj6E59De86z4yELnKSPh5_qw&usqp=CAU' }}
        />
        <Text style={styles.pointName}>Mercado</Text>
        <Text style={styles.pointItems}>Lâmpadas, óleo de cozinha</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Salvador, BA</Text>
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
