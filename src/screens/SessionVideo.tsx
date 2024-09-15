import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions,TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import JoystickCamera from '../components/JoystickCamera';
import VoiceControl from '../components/VoiceCommands';
import { Colors } from '../constants/Colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import ArrowPad from '../components/ArrowPad';
import ActionHelper from '../services/ActionHelper';
import JoystickPad from '../components/JoystickPad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CAMERA_URL } from '../constants/Urls';
import Orientation from 'react-native-orientation-locker';
import { IconLogout } from '../components/Icons/IconLogout';
// import AnalogSwitch from '../components/AnalogSwitch';
type sessionVideoRouteProp = RouteProp<RootStackParamList, 'SessionVideo'>;

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SessionVideo() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<sessionVideoRouteProp>();
    const {videoUrl} = route.params;
    let cloudinary_id: string;
    if(videoUrl) {
        // @ts-ignore
        cloudinary_id = videoUrl.split('/').pop().split('.mp4')[0];
    } else {
        cloudinary_id = "ride_drwnz7"
    }

   console.log(cloudinary_id)
    const onExitPress = async() => {
        navigation.goBack();
    }
    /**
     * Use Effect
     * Start manual session
     */
    useEffect(() => {
        // Lock orientation to landscape when component mounts
        Orientation.lockToLandscapeRight();
        return () => {
            Orientation.lockToPortrait();
            console.log('Session stopped and component unmounted.');
        };
    }, []);

    const HTML = `
<!DOCTYPE html>
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
            border: none;
            border-radius: 10px;
            max-width: 100%;
            max-height: 100%;
        }
    </style>
</head>
<body>
 <iframe   src="https://player.cloudinary.com/embed/?public_id=${cloudinary_id}&cloud_name=dtgt8j8u8&player[showLogo]=false"
        title="Camera Feed"
  width="600"
  height="360"
  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
  undefined
  allowfullscreen
  ></iframe>
</body>
</html>
`;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.exitButton}
                    onPress={onExitPress}
                >
                    <IconLogout color='red' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.controlContainer}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: HTML }}
                    style={styles.webview}
                />
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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        paddingHorizontal: 35,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    controlContainer: {
        flex: 5,
        marginVertical: 15,
        backgroundColor: Colors.light.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    camera: {
        width: screenWidth * 0.3, // Adjust width as needed
        height: screenHeight, // Adjust height as needed
    },
    webview: {
        flex: 1, // Take up remaining space
        height: 100, // Adjust height as needed
    },
    exitButton: {
        zIndex: 1
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',  // White color for the "S"
        fontWeight: 'bold',
    },
});
