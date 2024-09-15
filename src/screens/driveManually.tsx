import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions,TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import JoystickCamera from '../components/JoystickCamera';
import { Colors } from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import ArrowPad from '../components/ArrowPad';
import ActionHelper from '../services/ActionHelper';
import JoystickPad from '../components/JoystickPad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CAMERA_URL } from '../constants/Urls';
import Orientation from 'react-native-orientation-locker';
import { IconLogout } from '../components/Icons/IconLogout';

const HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joystick Control</title>
    <script src="https://cdn.jsdelivr.net/npm/nipplejs@0.8.1/dist/nipplejs.min.js"></script>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            overflow: hidden;
            background-color: #1C2631; /* Ajout d'une couleur de fond si nécessaire */
        }
        .iframe-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        iframe {
            border: 2px solid green;
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
</html>
`;
const startManualSession = async () => {
  try {
    await ActionHelper.startManualSession();
  } catch (error) {
    console.log('Error starting manual session:', error);
  }
}
const stopSession = async () => {
  try {
    await ActionHelper.stopSession();

  } catch (error) {
    console.log('Error starting manual session:', error);
  }
}



// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  export default function App() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [isSportActive, setIsSportActive] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [controllerType, setControllerType] = useState(1);
    const [driveAutoMode, setDriveAutoMode] = useState(false);

    /**
     * Toogle session
     */
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
        console.log(e)
      }
    }
    /**
     * Load Sport Mode
     */
    const loadDriveAutoMode = async() => {
      const selectedMode = await AsyncStorage.getItem('driveAutoMode');
      console.log("Drive Mode", selectedMode);
      setDriveAutoMode(selectedMode);
    }
       /**
     * Load Sport Mode
     */
       const loadSportMode = async() => {
        const selectedMode = await AsyncStorage.getItem('selectedMod');
        setIsSportActive(selectedMode !== null ? Boolean(selectedMode) : false);
      }
    /**
     * Load controller type
     */
    const loadControllerType = async () => {
      const controllerType = await AsyncStorage.getItem('selectedControl');
      setControllerType(Number(controllerType) ?? 1);
      console.log(controllerType);
    }
    /**
     * toogle sportMode
     */
    const toggleSportMode = async() => {
      setIsSportActive(!isSportActive);
      await AsyncStorage.setItem('selectedMod', JSON.stringify(!isSportActive));
    };
     /**
     * toogle sportMode
     */
     const toogleDriveAutoMode = async() => {
      setDriveAutoMode(!driveAutoMode);
      await AsyncStorage.setItem('driveAutoMode', JSON.stringify(!driveAutoMode));
    };
    const onExitPress = async() => {
      if(isSessionActive) toogleSession();
      navigation.goBack();
    }
  /**
 * Use Effect
 * Start manual session
 */
useEffect(() => {
    // Lock orientation to landscape when component mounts
  Orientation.lockToLandscapeRight();
  loadDriveAutoMode();
  loadSportMode();
  loadControllerType();

  return () => {
    // stop session
    setIsSessionActive(false);
    stopSession();
    Orientation.lockToPortrait();
    console.log('Session stopped and component unmounted.');
  };
}, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
      style={styles.exitButton}
        onPress={onExitPress}
      >
        <IconLogout color='red' size={20}/>
        </TouchableOpacity>
      <TouchableOpacity
        onPress={toogleSession}
        style={[
          styles.deactiveSportButton,
          isSessionActive && styles.activeSportButton,
          { zIndex: 1 } // Apply green shadow when active
        ]}
      >
        <Text style={styles.buttonText}>E</Text>
      </TouchableOpacity>
      <Text>{driveAutoMode}</Text>
      <TouchableOpacity
        onPress={toogleDriveAutoMode}
        style={[
          styles.deactiveSportButton,
          driveAutoMode && styles.activeSportButton,
          { zIndex: 1 } // Apply green shadow when active
        ]}
      >
        <Text style={styles.buttonText}>A</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleSportMode}
        style={[
          styles.deactiveSportButton,
          isSportActive && styles.activeSportButton,  // Apply green shadow when active
        ]}
      >
        
        <Text style={styles.buttonText}>S</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.controlContainer}>
        <View style={styles.pad}>

          {/* <VoiceControl /> */}
          {controllerType == 1 ? (
            <JoystickPad key={isSportActive ? 'sport' : 'normal'} isSportMode={isSportActive} />
          ) : controllerType == 2 ? (
            <ArrowPad key={isSportActive ? 'sport' : 'normal'} isSportMode={isSportActive} />
          ) : <View/>
          // : <VoiceControl onActivationChange={setIsVoiceActive} />
          }
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
    height: "100%", 
    backgroundColor: Colors.light.background,
    width:  "100%",
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: "100%",
  },
  controlContainer: {
    flex: 5,
    backgroundColor: Colors.light.background,
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Adjust as needed for spacing
    alignItems: 'center', // Center align vertically
  },
  camera: {
    width: screenWidth * 0.3, // Adjust width as needed
    height: screenHeight, // Adjust height as needed
  },
  webview: {
    flex: 1, // Take up remaining space
    height: 100, // Adjust height as needed
  },
  pad: {
    justifyContent: 'center', // Center align vertically
    alignItems: 'center', // Center align horizontally
    zIndex: 1, // Place the pad on top of the camera
    width: screenWidth * 0.3, // Adjust width as needed
    height: screenHeight, // Adjust height as needed
  },
  deactiveSportButton: {
    height: 40,
    width:40,
    borderRadius: 40,  // Make it circular
    backgroundColor: '#1c1c1e',  // Dark color like a car button (metallic look)
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,  // Basic elevation
  },
  exitButton: {
    zIndex: 1
  },
  activeSportButton: {
    height: 40,
    width: 40,
    backgroundColor: '#1c1c1e',  // Keep the car button look
    shadowColor: '#4CAF50',  // Green shadow around the button
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',  // White color for the "S"
    fontWeight: 'bold',
  },
});
