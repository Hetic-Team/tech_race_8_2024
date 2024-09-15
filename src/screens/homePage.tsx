import Button from '../components/Button';
import {Colors} from '../constants/Colors';
import React , { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import Orientation from 'react-native-orientation-locker';

export default function HomePage() {

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDriveManually = () => {
    navigation.navigate('DriveManually');
  };

  const handleSetting = () => {
    navigation.navigate('Setting');
  };

  const handleTripsData = () => {
    navigation.navigate('MyTripsData');
  };

  const handleDriveAuto = () => {
    navigation.navigate('DriveAuto');
  };

useEffect(() => {
  // Lock orientation to landscape when component mounts
  Orientation.lockToPortrait();

  // Unlock orientation when component unmounts
  return () => {
    Orientation.unlockAllOrientations();
  };
}, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={[{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: 30}]}>
        <Button label="Drive Manually" onClick={handleDriveManually}/>
        <Button label="Autopilot" onClick={handleDriveAuto}/>
        <Button label="My Trips" onClick={handleTripsData}/>

        <Button label="Modes" onClick={handleSetting}/>
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
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
