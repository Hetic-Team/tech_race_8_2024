import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import JoystickCamera from '../components/JoystickCamera';
import VoiceControl from '../components/VoiceCommands';

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
            background-color: white;
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

export default function App() {
  const [isActivated, setIsActivated] = useState(false);

  return (
    <View style={[styles.container, isActivated && styles.activatedBorder]}>
      <View style={styles.joystickCameraContainer}>
        <JoystickCamera />
      </View>

      <WebView
        originWhitelist={['*']}
        source={{ html: HTML }}
        style={styles.webview}
      />
      <View style={styles.joystickContainer}>
        <VoiceControl onActivationChange={setIsActivated} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  activatedBorder: {
    borderWidth: 15,
    borderColor: '#90ee90',

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
