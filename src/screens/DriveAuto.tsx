import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions,TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import JoystickCamera from '../components/JoystickCamera';
import { Colors } from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import ActionHelper from '../services/ActionHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CAMERA_URL } from '../constants/Urls';
import Orientation from 'react-native-orientation-locker';
import { IconLogout } from '../components/Icons/IconLogout';
import useHandleAutopilot from "../hooks/useHandleAutopilot";
import {AUTO_PILOT, AUTO_PILOT_STOP} from "../constants/Urls";

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

type Autopilot = {
    status: string,
    autopilot: string,
    message: string,
    recording: string
}

export default function DriveAuto() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [controllerType, setControllerType] = useState(1);
    const [isAutoLoading, setLoading] = useState(true);
    const [messageAutoPilot, setMessageAutoPilot] = useState<Autopilot>({status: "", autopilot: "", message: "", recording: ""});
    const [error, setError] = useState<string | null>(null);

    console.log(messageAutoPilot)
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
     * Load controller type
     */
    const loadControllerType = async () => {
        setControllerType(Number(controllerType) ?? 1);
        console.log(controllerType);
    }

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

        const getAutoPilot = async () => {
            try {
                setLoading(true)
                const response = await fetch(AUTO_PILOT);
                const json = await response.json();
                if (json.status === "success" && json.autopilot === "1") {
                    setMessageAutoPilot(json);
                    setLoading(false)
                } else {
                    setError('There was an error when starting the car')
                    setLoading(false)
                }

            } catch (error) {
                setError('Error fetching autopilot data to start autopilot');
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        getAutoPilot()
        loadControllerType();

        return () => {
            // stop session
            setIsSessionActive(false);
            stopSession();
            Orientation.lockToPortrait();
            console.log('Session stopped and component unmounted.');
        };
    }, []);


    const autoPilotOn = messageAutoPilot.autopilot === "1" && !isAutoLoading

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
            border: 3px solid #00B86B;
            border-radius: 10px;
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.exitButton}
                    onPress={onExitPress}
                >
                    <IconLogout color='red' size={20}/>
                </TouchableOpacity>
                <Text style={styles.buttonText}>{isAutoLoading ? 'Loading autopilot mode...' : ''}</Text>
                <Text style={styles.buttonText}>{messageAutoPilot.autopilot === "1" && !isAutoLoading ? 'Autopilot is on' : ''}</Text>
            </View>
            <View style={styles.controlContainer}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: HTML }}
                    style={styles.webview}
                />
                {!autoPilotOn ? (<JoystickCamera />) : null}

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    camera: {
        width: screenWidth * 0.3,
        height: screenHeight,
    },
    webview: {
        //flex: 1,
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
        width:40,
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
        borderRadius: 40,
        height: 40,
        width: 40,
        backgroundColor: Colors.dark.primaryGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});
