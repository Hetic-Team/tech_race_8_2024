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
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        .camera-feed {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            border: none;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div class="camera-feed">
        <iframe src="https://blog.logrocket.com/" title="Camera Feed"></iframe>
    </div>
</body>
</html>
`;

export default function App() {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: HTML }}
        style={styles.webview}
      />
     <GestureHandlerRootView style={styles.joystickContainer}>
        <JoystickPadTwo />
      </GestureHandlerRootView>
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
  },
});