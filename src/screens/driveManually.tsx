import { WebView } from 'react-native-webview';
import { Colors } from '../constants/Colors';
import React, {useEffect} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {JoystickPadTwo} from '../components/JoystickPadTwo';
import ArrowPad from '../components/ArrowPad';
import ActionHelper from '../services/ActionHelper';
import JoystickPad from '../components/JoystickPad';
import JoystickCamera from '../components/JoystickCamera';


const HTML = `<!DOCTYPE html>
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
            border: 2px solid green; /* Supprime les bordures de l'iframe si vous ne les voulez pas */
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

/**
 * Use Effect
 * Start manual session
 */
useEffect(() => {
  // start manual session
  ActionHelper.startManualSession().then(() => { });

  return () => {
    ActionHelper.stopSession();
    console.log('Session stopped and component unmounted.');
  };
}, []);

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.pad}>
        <JoystickPad />
        </View>

      <WebView
        originWhitelist={['*']}
        source={{ html: HTML }}
        style={styles.webview}
      />
            <JoystickCamera />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});