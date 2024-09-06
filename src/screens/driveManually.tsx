import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions,TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import JoystickCamera from '../components/JoystickCamera';
import VoiceControl from '../components/VoiceCommands';
import { Colors } from '../constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import ArrowPad from '../components/ArrowPad';
import ActionHelper from '../services/ActionHelper';
import JoystickPad from '../components/JoystickPad';
// import AnalogSwitch from '../components/AnalogSwitch';

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
        <iframe src="http://192.168.87.10:7000/" title="Camera Feed" height="296" width="400"></iframe>
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
    const [isSportActive, setIsSportActive] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(true);

    /**
     * Toogle session
     */
    const toogleSession = () => {
      console.log('Toogle session');
      // if (isSessionActive) {
      //   stopSession();
      //   setIsSessionActive(false);
      // } else {
      //   startManualSession();
      //   setIsSessionActive(true);
      // }
    }
    const toggleSportMode = () => {
      console.log('Toggle sport mode');
      setIsSportActive(!isSportActive);
    };
  /**
 * Use Effect
 * Start manual session
 */
useEffect(() => {
  // // start manual session
 

  return () => {
    // stop session
    stopSession();
    console.log('Session stopped and component unmounted.');
  };
}, []);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={toggleSportMode}
        style={[
          styles.deactiveSportButton,
          isSportActive && styles.activeSportButton,  // Apply green shadow when active
        ]}
      >
        
        <Text style={styles.buttonText}>SS</Text>
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
        {/* <JoystickPad /> */}
        <ArrowPad/>
        </View>

      <WebView
        originWhitelist={['*']}
        source={{ html: HTML }}
        style={styles.webview}
        />
            <JoystickCamera />
    
      </View>
      </View>
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
