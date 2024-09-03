import React, { PropsWithChildren } from 'react';
import {Colors} from '../constants/Colors';
import { Text, StyleSheet, Pressable } from 'react-native';

type PressableBtnProps = {
    onPress: () => void;
    bgColor: string;
    maxWidth: number | "100%";
} & PropsWithChildren

export default function PressableButton(props: PressableBtnProps) {
  const { children, onPress, bgColor = Colors.light.primaryGreen, maxWidth="100%"} = props;
  return (
    <Pressable style={[styles.buttonContainer, {backgroundColor: bgColor, maxWidth: maxWidth}]} onPress={onPress}>
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