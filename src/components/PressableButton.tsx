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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  },
});