import Button from '../components/Button';
import {Colors} from '../constants/Colors';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import { IconLogout } from '../components/Icons/IconLogout';
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

  const handleLogout = () => {
    navigation.navigate('HomePage', {vehicleIP: ""});
}


  return (
    <View style={styles.container}>
        <View style={[{flex:1, flexDirection:"column", justifyContent:"center", alignItems:"center", rowGap:30}]}>
      <Button label="Drive" onClick={handleDriveManually} />
      <Button label="My Trips" onClick={handleTripsData} />
   
      <Button label="Modes" onClick={handleSetting} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
          <IconLogout color="red" size={20}/>
      </TouchableOpacity>
     
    </View>
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
  logoutButton: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderColor: 'red',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
},
  logoutButtonText:{
      color: 'red',
      fontSize: 20,
  },
});
