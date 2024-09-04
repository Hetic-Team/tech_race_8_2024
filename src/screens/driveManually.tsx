import { WebView } from 'react-native-webview';
import { Colors } from '../constants/Colors';

import React, {useEffect} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {JoystickPadTwo} from '../components/JoystickPadTwo';
import ArrowPad from '../components/ArrowPad';
import JoystickPad from '../components/JoystickPad';
import JoystickCamera from '../components/JoystickCamera';
import VoiceControl from '../components/VoiceCommands';


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
            background-color: white; /* Ajout d'une couleur de fond si nécessaire */
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

export default function App() {
  return (
    <View style={styles.container}>
       <View style={styles.joystickCameraContainer}>
       <JoystickCamera/>
     </View>

      <WebView
        originWhitelist={['*']}
        source={{ html: HTML }}
        style={styles.webview}
      />
    <View style={styles.joystickContainer}>
        {/* <JoystickPad /> */}
        <VoiceControl />
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Important for absolute positioning of children
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  joystickContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 150,
    height: 150,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickCameraContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 150,
    height: 150,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
