import React, { PropsWithChildren } from 'react';
import {Colors} from '../constants/Colors';
import { Text, StyleSheet, Pressable } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

type PressableBtnProps = {
    onPress: () => void;
    css: any
} & PropsWithChildren



export default function PressableButton(props: PressableBtnProps) {
  const { children, onPress, css} = props;
  
  return (
    <Pressable style={[styles.buttonContainer, css]} onPress={onPress}>
        {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25
  },
});