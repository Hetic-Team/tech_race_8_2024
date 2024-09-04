import {Colors} from '../constants/Colors';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {CircleArrowLeft} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Button from '../components/Button';
import PressableButton from '../components/PressableButton'

export default function MoreInfo() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleVehicleData = () => {
    console.log('Button Vehicle Data');
    navigation.navigate('VehicleData');
  };

  const handleSessionLog = () => {
    console.log('Button Session Log');
    navigation.navigate('SessionLog');
  };

  return (
    <View style={styles.container}>
      <PressableButton css={{backgroundColor:Colors.light.primaryGreen, position:'absolute', top:20, left: wp(10), alignSelf: 'flex-start'}} onPress={() => navigation.goBack()} >
        <CircleArrowLeft color={"#fff"}/>
      </PressableButton>
      <Button label="Vehicle Trips Data" onClick={handleVehicleData} />
      <Button label="Sessions Logs" onClick={handleSessionLog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(10),
    backgroundColor: Colors.dark.mainBackground,
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
});
