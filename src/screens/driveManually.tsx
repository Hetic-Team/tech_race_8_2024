import { Colors } from '../constants/Colors';

import React, {useEffect} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {Provider} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';



// import { Joystick } from "@/components/Joystick";

// import JoystickSecond from "../components/JoystickSecond";
// import SettingsPopup from "@/popups/SettingsPopup";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {JoystickPad} from '../components/JoystickPad';
import {JoystickPadTwo} from '../components/JoystickPadTwo';
import { RootStackParamList } from '../..//App';
// import {JoystickCamera} from '../components/JoystickCamera';

export default function DriveManually() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    // <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.joystick}>
        <GestureHandlerRootView>
          <JoystickPadTwo />
          </GestureHandlerRootView>
        </View>
        {/* <View style={styles.joystickCamera}>
          <JoystickCamera />
        </View>

        <SettingsPopup /> */}
      </SafeAreaView>
    // </Provider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    buttonStart: {
        fontSize: hp(3),
        backgroundColor: Colors.light.background,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: hp(7),
        width: wp(80),
        borderRadius: 8,
        margin: hp(3),
        color: 'white',
        
    },
    scrollContentContainer: {
        alignItems: 'center',
        paddingBottom: 60,
    },
    box: {
        height: 100,
        width: 100,
        borderRadius: 5,
        marginVertical: 40,
        backgroundColor: '#61dafb',
        alignItems: 'center',
        justifyContent: 'center',
      },
});