/* eslint-disable prettier/prettier */
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text style={styles.button} onPress={props.onClick}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: hp(3),
    backgroundColor: Colors.light.primaryGreen,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: hp(7),
    width: wp(80),
    borderRadius: 8,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default Button;
