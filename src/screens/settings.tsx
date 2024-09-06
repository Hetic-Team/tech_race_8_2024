import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/Colors';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { IconArrowLeft } from '../components/Icons/IconArowLeft';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconArrowJoystick } from '../components/Icons/IconArrowJoystick';
import { IconJoystick } from '../components/Icons/IconJoystick';
import { IconVoice } from '../components/Icons/IconVoice';
import { SwitchButton } from '../components/SwitchButton';

export default function Setting() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedControl, setSelectedControl] = useState('Joystick');
  const [isSportModSelected ,setIsSportModSelected] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  }

  const toggleSwitchSportMod = async () => {
    const newSportModState = !isSportModSelected;
    setIsSportModSelected(newSportModState);

    try {
      await AsyncStorage.setItem('selectedMod', JSON.stringify(newSportModState));
    } catch (e) {
      console.error('Failed to save state to AsyncStorage', e);
    }
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

  // Selection de la reconnaissance vocale pour déplacer la voiture
  const handleSelectVoice = async () => {
    if (selectedControl === 'Voice') {
      return;
    }

    setSelectedControl('Voice');

    try {
      await AsyncStorage.setItem('selectedControl', 'Voice');
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

    const loadSportModState = async () => {
      try {
        const savedModState = await AsyncStorage.getItem('selectedMod');
        if (savedModState !== null) {
          setIsSportModSelected(JSON.parse(savedModState));
        }
      } catch (e) {
        console.error('Failed to load state from AsyncStorage', e);
      }
    };

    loadSettings();
    loadSportModState();
  }, []);

  return (
      <View style={styles.container}>
          <View style={styles.navigationContainer}>
              <TouchableOpacity onPress={handleBack}>
                  <IconArrowLeft />
              </TouchableOpacity>
              <Text style={styles.pageText}>Settings</Text>
          </View>
          <View style={styles.settingsContainer}>
            <View style={styles.listSettingsContainer}>
              <Text style={styles.settingsLabel}>Controls :</Text>
              <View style={styles.controlSettingsContainer}>
                <TouchableOpacity style={selectedControl === 'Joystick' ? styles.joystickActiveCard : styles.joystickCard} onPress={handleSelectJoystick}>
                  <IconJoystick size={50} color={selectedControl === 'Joystick' ? Colors.dark.primaryGreen : Colors.dark.placeholder}/>
                  <Text style={selectedControl === 'Joystick' ? styles.activeSettingsText : styles.settingsText}>JOYSTICK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectedControl === 'Arrow' ? styles.joystickActiveCard : styles.joystickCard} onPress={handleSelectArrow}>
                  <IconArrowJoystick size={50} color={selectedControl === 'Arrow' ? Colors.dark.primaryGreen : Colors.dark.placeholder}/>
                  <Text style={selectedControl === 'Arrow' ? styles.activeSettingsText : styles.settingsText}>ARROW</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectedControl === 'Voice' ? styles.joystickActiveCard : styles.joystickCard} onPress={handleSelectVoice}>
                  <IconVoice size={50} color={selectedControl === 'Voice' ? Colors.dark.primaryGreen : Colors.dark.placeholder}/>
                  <Text style={selectedControl === 'Voice' ? styles.activeSettingsText : styles.settingsText}>VOICE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listSettingsContainer}>
              <Text style={styles.settingsLabel}>Mods :</Text>
              <View style={styles.modsSettingsContainer}>
                <View style={styles.rowModsSettings}>
                  <Text style={styles.settingsText}>Sport Mod</Text>
                  <SwitchButton isActive={isSportModSelected} onClick={toggleSwitchSportMod} />
                </View>
              </View>
            </View>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  pageText: {
    color: 'white',
    fontSize: 20,
  },
  container: {
      position: 'relative',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors.dark.mainBackground,
      paddingHorizontal: 40,
      height: 50,
  },
  navigationContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      top: 20,
      left: 20,
      position: 'absolute',
      gap: 20,
  },
  settingsContainer: {
      flexDirection: 'column',
      gap: 40,
  },
  listSettingsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  settingsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.primaryGreen,
  },
  controlSettingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  modsSettingsContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  rowModsSettings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  vehiculeText: {
      color: Colors.dark.text,
      fontSize: 24,
      marginTop: 20,
  },
  settingsText:{
      color: Colors.dark.placeholder,
      fontSize: 20,
      fontWeight: 'bold',
  },
  activeSettingsText: {
    color: Colors.dark.primaryGreen,
    fontSize: 20,
    fontWeight: 'bold',
  },
  joystickActiveCard: {
    borderWidth: 4,
    borderColor: Colors.dark.primaryGreen,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    width: 150,
    height: 150,
  },
  joystickCard: {
    borderWidth: 2,
    borderColor: Colors.dark.placeholder,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    width: 150,
    height: 150,
  }
});
