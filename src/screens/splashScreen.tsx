/* eslint-disable prettier/prettier */
import {Colors} from '../constants/Colors';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

export default function SplashScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleStart = () => {
    console.log('Button Start');
    navigation.navigate('HomePage', { vehicleIP: '0.0.0.0' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Tech Race</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button label="Start" onClick={handleStart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    bottom: 30,
    paddingHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
