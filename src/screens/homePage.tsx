import Button from '../components/Button';
import {Colors} from '../constants/Colors';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomePageRouteProp = RouteProp<RootStackParamList, 'HomePage'>;

export default function HomePage() {
  const route = useRoute<HomePageRouteProp>();
  const {vehicleIP} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDriveManually = () => {
    console.log('Button Drive Manually');
    navigation.navigate('DriveManually');
  };

  const handleSetting = () => {
    console.log('Button Setting');
    navigation.navigate('Setting');
  };

  const handleTripsData = () => {
    console.log('Button Setting');
    navigation.navigate('MyTripsData');
  };

  return (
    <View style={styles.container}>
      <Button label="Drive" onClick={handleDriveManually} />
      <Button label="My Trips" onClick={handleTripsData} />
      <Button label="Settings" onClick={handleSetting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.mainBackground,
    paddingHorizontal: 40,
    gap: wp(15),
  },
  titleLogin: {
    top: 60,
    left: 40,
    position: 'absolute',
    fontSize: 40,
    color: Colors.dark.text,
  },
  subtitleLogin: {
    top: 120,
    left: 40,
    position: 'absolute',
    fontSize: 16,
    color: Colors.dark.text,
  },
  vehicleIP: {
    color: '#ffffff',
    fontSize: 20,
  },
});
