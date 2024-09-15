import {Colors} from '../constants/Colors';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import { Snackbar } from 'react-native-paper'; //
import { IconArrowLeft } from '../components/Icons/IconArowLeft';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconArrowJoystick } from '../components/Icons/IconArrowJoystick';
import { IconJoystick } from '../components/Icons/IconJoystick';
import { IconVoice } from '../components/Icons/IconVoice';
import {IconDisabled} from '../components/Icons/IconDisabled';
import { SwitchButton } from '../components/SwitchButton';
import useHandleAutopilot from "../hooks/useHandleAutopilot";
import {messageParent} from "jest-worker";

export default function Setting() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setAutoPilot, messageAutoPilot, makeAutopilot, isAutoLoading } = useHandleAutopilot()
  const [isAutoMode, setIsAutoMode] = useState<string>("")
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const controlList = [
    {
      idControl: 1,
      label: 'Joystick',
      icon: messageAutoPilot.autopilot === "1" ? IconDisabled : IconJoystick,
    },
    {
      idControl: 2,
      label: 'Arrow',
      icon: messageAutoPilot.autopilot === "1" ? IconDisabled :IconArrowJoystick,
    },
    {
      idControl: 3,
      label: 'Voice',
      icon: messageAutoPilot.autopilot === "1" ? IconDisabled : IconVoice,
    },
  ];
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };
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
  const toggleDriveMode = async () => {
    setAutoPilot(!makeAutopilot)

    try {
      await AsyncStorage.setItem('driveAutoMode', JSON.stringify(!makeAutopilot));
    } catch (e) {
      console.error('Failed to save state driveAutoMode to AsyncStorage', e);
    }
  }
  
  const handleSelectControl = async (idControl: number) => {
    if (selectedControl === idControl) {
      return;
    }

    setSelectedControl(idControl);

    try {
      await AsyncStorage.setItem('selectedControl', idControl.toString());
      if(idControl == 3 && isSportModSelected) {
        toggleSwitchSportMod();
        showSnackbar('Pour des raisons de sécurité, le mode sport est désactivé par défaut dans le voice.');
      }
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
    const loadDriveMode = async () => {
      try {
        const savedModState = await AsyncStorage.getItem('driveAutoMode');
        if (savedModState !== null) {
          setIsAutoMode(JSON.parse(savedModState));
        }
      } catch (e) {
        console.error('Failed to load state from AsyncStorage', e);
      }
    };

    loadSelectedControl();
    loadSportModState();
    loadDriveMode();
  }, []);



  console.log('message in settings', messageAutoPilot.message)

  function makeCardStyles(selected: boolean) {
    return  selected ? styles.joystickActiveCard : styles.joystickCard
  }

  function makeTextCardStyles(selected:boolean) {
    return selected ? styles.activeSettingsText : styles.settingsText
  }

  function makeIconCardStyles(selected: boolean): string {
    return selected ? Colors.dark.primaryGreen :  Colors.dark.placeholder
  }



  return (
    <SafeAreaView style={styles.container}>
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
                  disabled={messageAutoPilot.autopilot === "1"}
                  style={messageAutoPilot.autopilot === "1" ? styles.joystickInactiveCard : makeCardStyles(selectedControl === control.idControl) }
                  onPress={() => handleSelectControl(control.idControl)}
                >
                  <IconComponent
                    size={50} 
                    color={messageAutoPilot.autopilot === "1" ? Colors.dark.placeholder :  makeIconCardStyles(selectedControl === control.idControl)}
                  />
                  <Text 
                    style={messageAutoPilot.autopilot === "1" ? styles.settingsText : makeTextCardStyles(selectedControl === control.idControl) }
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
            <Text style={styles.settingsText}>{isAutoLoading ? 'loading...' : messageAutoPilot.message} </Text>
            <View style={styles.rowModsSettings}>
              <Text style={styles.settingsText}>Auto Mode</Text>
              <SwitchButton isActive={makeAutopilot} onClick={toggleDriveMode} />
            </View>
            <View style={styles.rowModsSettings}>
              <Text style={styles.settingsText}>Sport Mode</Text>
              <SwitchButton isActive={isSportModSelected} onClick={toggleSwitchSportMod} />
            </View>
          </View>
        </View>
        <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      duration={3000}
      style={styles.snackbar}
    >
      {snackbarMessage}
    </Snackbar>
      </View>
    </SafeAreaView>
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
  },
  joystickInactiveCard: {
    borderWidth: 2,
    borderColor: Colors.dark.errorColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    width: 150,
    height: 150,
  },
  snackbar: {
    backgroundColor: Colors.dark.warning,
    color: 'white',
  },
});
