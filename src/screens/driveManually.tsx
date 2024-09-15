import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import JoystickCamera from '../components/JoystickCamera';
import VoiceControl from '../components/VoiceCommands';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import ArrowPad from '../components/ArrowPad';
import ActionHelper from '../services/ActionHelper';
import JoystickPad from '../components/JoystickPad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CAMERA_URL } from '../constants/Urls';
import Orientation from 'react-native-orientation-locker';
import { IconLogout } from '../components/Icons/IconLogout';
import CarDoorEffect from '../components/CarDoorEffect';
import { calculateSpeedInMph } from '../services/MovementService';
import SpeedView from '../components/SpeedView';
import SoundPlayer from 'react-native-sound-player'

// import AnalogSwitch from '../components/AnalogSwitch';

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joystick Control</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            overflow: hidden;
            background-color: #1C2631;
        }
        .iframe-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        iframe {
            border-radius: 10px;
            border: 2px solid #00B86B;
            max-width: 100%;
            max-height: 100%;
        }
    </style>
</head>
<body>
    <div class="iframe-container">
        <iframe src="${CAMERA_URL}" title="Camera Feed" height="80%" width="400"></iframe>
    </div>
</body>
</html>`;

const startManualSession = async () => {
  try {
    await ActionHelper.startManualSession();
  } catch (error) {
    console.log('Error starting manual session:', error);
  }
};

const stopSession = async () => {
  try {
    await ActionHelper.stopSession();
  } catch (error) {
    console.log('Error stopping session:', error);
  }
};

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isSportActive, setIsSportActive] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [controllerType, setControllerType] = useState(1);
  const [driveAutoMode, setDriveAutoMode] = useState(false);
  const [isDoorVisible, setIsDoorVisible] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [onCompleteDoor, setOnCompleteDoor] = useState<Boolean>(false);

  // load the sound
  const playSound = () => {
        SoundPlayer.playAsset(require('../assets/sounds/startup3.mp3'))
  };

  const toogleSession = async () => {
    try {
      if (isSessionActive) {
        await stopSession();
        setIsSessionActive(false);
      } else {
        await startManualSession();
        setIsSessionActive(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSpeedChange = (speed: number) => {
    const derrivedspeed = calculateSpeedInMph(speed);
    setCurrentSpeed(Number(derrivedspeed.toFixed(2)));
    console.log("Speed from JoystickPad:", derrivedspeed);
  };

  const loadSportMode = async () => {
    const selectedMode = await AsyncStorage.getItem('selectedMod');
    setIsSportActive(selectedMode === 'true');
  };

  const loadControllerType = async () => {
    const controllerType = await AsyncStorage.getItem('selectedControl');
    setControllerType(Number(controllerType) ?? 1);
    console.log(controllerType);
  };

  const toggleSportMode = async () => {
    const newMode = !isSportActive;
    setIsSportActive(newMode);
    await AsyncStorage.setItem('selectedMod', JSON.stringify(newMode));
  };

  const onCompleteOpenDoor = async () => {
    setOnCompleteDoor(true);
  };

  const onExitPress = async () => {
    if (isSessionActive) await toogleSession();
    navigation.goBack();
  };



  useEffect(() => {
    Orientation.lockToLandscapeRight();
    playSound();
    loadSportMode();
    loadControllerType();
    
    // Hide doors after a delay for demo purposes
    // const timer = setTimeout(() => {
    //   setIsDoorVisible(false);
    // }, 3000); // Adjust timing as needed

    return () => {
      setIsSessionActive(false);
      SoundPlayer.stop();
      stopSession();
      Orientation.lockToPortrait();
      console.log('Session stopped and component unmounted.');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!onCompleteDoor?<CarDoorEffect isVisible={isDoorVisible} onComplete={onCompleteOpenDoor}/>:<View/>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={onExitPress}
        >
          <IconLogout color='red' size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toogleSession}
          style={[
            styles.deactiveSportButton,
            isSessionActive && styles.activeSportButton,
            { zIndex: 1 }
          ]}
        >
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
        <SpeedView speed={currentSpeed}/>
        <TouchableOpacity
          onPress={toggleSportMode}
          style={[
            styles.deactiveSportButton,
            isSportActive && styles.activeSportButton,
          ]}
        >
          <Text style={styles.buttonText}>S</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlContainer}>
        <View style={styles.pad}>
          {controllerType == 3 ? (
         <VoiceControl/> 
          ) : controllerType == 2 ? (
            <ArrowPad key={isSportActive ? 'sport' : 'normal'} isSportMode={isSportActive} />
          ) :   <JoystickPad key={isSportActive ? 'sport' : 'normal'} isSportMode={isSportActive}  onSpeedChange={handleSpeedChange}/>}
        </View>
        <WebView
          originWhitelist={['*']}
          source={{ html: HTML }}
          style={styles.webview}
        />
        <JoystickCamera />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.light.background,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  controlContainer: {
    flex: 5,
    backgroundColor: Colors.light.background,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  camera: {
    width: screenWidth * 0.3,
    height: screenHeight,
  },
  webview: {
    flex: 1,
    height: 100,
  },
  pad: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: screenWidth * 0.3,
    height: screenHeight,
  },
  deactiveSportButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  exitButton: {
    zIndex: 1
  },
  activeSportButton: {
    height: 40,
    width: 40,
    backgroundColor: Colors.dark.primaryGreen,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
