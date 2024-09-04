import {Colors} from '../constants/Colors';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { IconArrowLeft } from '../components/Icons/IconArowLeft';
import { IconLogout } from '../components/Icons/IconLogout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconArrowJoystick } from '../components/Icons/IconArrowJoystick';
import { IconJoystick } from '../components/Icons/IconJoystick';

export default function Setting() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const [selectedControl, setSelectedControl] = useState('Joystick');

  const handleBack = () => {
    navigation.goBack();
  }

  const handleLogout = () => {
      navigation.navigate('Login');
  }

  // Selection du joystick pour déplacer la voiture
  const handleSelectJoystick = async () => {
    if (selectedControl === 'Joystick') {
      return;
    }

    setSelectedControl('Joystick');

    try {
      await AsyncStorage.setItem('selectedControl', 'Joystick');
    } catch (e) {
      console.error('Failed to save state to AsyncStorage', e);
    }
  };

  // Selection des flèches pour déplacer la voiture
  const handleSelectArrow = async () => {
    if (selectedControl === 'Arrow') {
      return;
    }

    setSelectedControl('Arrow');

    try {
      await AsyncStorage.setItem('selectedControl', 'Arrow');
    } catch (e) {
      console.error('Failed to save state to AsyncStorage', e);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedControl = await AsyncStorage.getItem('selectedControl');
        if (savedControl !== null) {
          setSelectedControl(savedControl);
        }
      } catch (e) {
        console.error('Failed to load state from AsyncStorage', e);
      }
    };

    loadSettings();
  }, []);
  
  return (
      <View style={styles.container}>
          <View style={styles.navigationContainer}>
              <TouchableOpacity onPress={handleBack}>
                  <IconArrowLeft />
              </TouchableOpacity>
              <Text style={styles.settingsText}>Settings</Text>
          </View>
          <View style={styles.vehiculeInformations}>
              <Text style={styles.vehiculeText}>Vehicule ID : 1234 </Text>
          </View>
          <View style={styles.settingsContainer}>
              <TouchableOpacity style={selectedControl === 'Joystick' ? styles.joystickActiveCard : styles.joystickCard} onPress={handleSelectJoystick}>
                <IconJoystick size={100} color={selectedControl === 'Joystick' ? Colors.dark.primaryGreen : "white"}/>
                <Text style={selectedControl === 'Joystick' ? styles.activeSettingsText : styles.settingsText}>JOYSTICK</Text>
              </TouchableOpacity>
              <TouchableOpacity style={selectedControl === 'Arrow' ? styles.joystickActiveCard : styles.joystickCard} onPress={handleSelectArrow}>
                <IconArrowJoystick size={100} color={selectedControl === 'Arrow' ? Colors.dark.primaryGreen : "white"}/>
                <Text style={selectedControl === 'Arrow' ? styles.activeSettingsText : styles.settingsText}>ARROW</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                  <Text style={styles.logoutButtonText}>LOGOUT</Text>
                  <IconLogout color="red" size={20}/>
              </TouchableOpacity>
          </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      position: 'relative',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors.dark.mainBackground,
      paddingHorizontal: 40,
      height: 50,
  },
  vehiculeInformations: {
      top: 60,
      left: 40,
      position: 'absolute',
  },
  navigationContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      top: 20,
      left: 20,
      position: 'absolute',
      gap: 20,
  },
  logoutButton: {
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
  settingsContainer: {
      flexDirection: 'column',
      gap: 60,
  },
  vehiculeText: {
      color: Colors.dark.text,
      fontSize: 24,
      marginTop: 20,
  },
  settingsText:{
      color: Colors.dark.text,
      fontSize: 20,
  },
  activeSettingsText: {
    color: Colors.dark.primaryGreen,
    fontSize: 20,
  },
  joystickActiveCard: {
    borderWidth: 4,
    borderColor: Colors.dark.primaryGreen,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  },
  joystickCard: {
    borderWidth: 2,
    borderColor: Colors.dark.placeholder,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  }
});
