import Button from '../components/Button';
import {Colors} from '../constants/Colors';
import React , { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import { IconLogout } from '../components/Icons/IconLogout';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Orientation from 'react-native-orientation-locker';
import axios from 'axios';
import { SESSION_URL } from '../constants/Urls';

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

useEffect(() => {
  // Lock orientation to landscape when component mounts
  Orientation.lockToPortrait();

 const fetchData = async () => {
    try {
      const response = await axios.get(`http://${SESSION_URL}/stream/start`);
      console.log("Manual Session Connected");
      return response.data;
    } catch (error) {
      console.error((error as any).toString());
      throw error;
    }
  }

  fetchData();
  // Unlock orientation when component unmounts
  return () => {
    Orientation.unlockAllOrientations();
  };
}, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={[{flex:1, flexDirection:"column", justifyContent:"center", alignItems:"center", rowGap:30}]}>
      <Button label="Drive" onClick={handleDriveManually} />
      <Button label="My Trips" onClick={handleTripsData} />

      <Button label="Modes" onClick={handleSetting} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.mainBackground,
    paddingVertical: 20,
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
  }
});
