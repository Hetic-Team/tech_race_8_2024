import {Colors} from '../constants/Colors';
import React, { useEffect, useState } from 'react';
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

  const controlList = [
    {
      idControl: 1,
      label: 'Joystick',
      icon: IconJoystick,
    },
    {
      idControl: 2,
      label: 'Arrow',
      icon: IconArrowJoystick,
    },
    {
      idControl: 3,
      label: 'Voice',
      icon: IconVoice,
    },
  ];

  const [selectedControl, setSelectedControl] = useState(1);
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
  
  const handleSelectControl = async (idControl: number) => {
    if (selectedControl === idControl) {
      return;
    }

    setSelectedControl(idControl);

    try {
      await AsyncStorage.setItem('selectedControl', idControl.toString());
    } catch (e) {
      console.error('Failed to save state to AsyncStorage', e);
    }
  };

  useEffect(() => {
    const loadSelectedControl = async () => {
      try {
        const savedControl = await AsyncStorage.getItem('selectedControl');
        if (savedControl !== null) {
          setSelectedControl(parseInt(savedControl, 10));
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

    loadSelectedControl();
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
            {controlList.map((control) => {
              const IconComponent = control.icon;
              return (
                <TouchableOpacity 
                  key={control.idControl}
                  style={selectedControl === control.idControl ? styles.joystickActiveCard : styles.joystickCard} 
                  onPress={() => handleSelectControl(control.idControl)}
                >
                  <IconComponent 
                    size={50} 
                    color={selectedControl === control.idControl ? Colors.dark.primaryGreen : Colors.dark.placeholder}
                  />
                  <Text 
                    style={selectedControl === control.idControl ? styles.activeSettingsText : styles.settingsText}
                  >
                    {control.label.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
};

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
