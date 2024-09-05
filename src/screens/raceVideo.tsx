import {Colors} from '../constants/Colors';
import React,  {useEffect, useState, useRef} from 'react';
import {CircleArrowLeft} from 'lucide-react-native';
import {View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import PressableButton from '../components/PressableButton'

const RaceVideo = () =>  {

    const videoRef = useRef<VideoRef>(null);
    const navigation = useNavigation();

  return (
    <ScrollView style={{ flexGrow: 1, flex: 1 }}>
        <View style={styles.navigationBar}>
          <PressableButton 
              css={{backgroundColor:Colors.light.primaryGreen, maxWidth: 30}}
              onPress={() => navigation.goBack()}
              >
              <CircleArrowLeft color={"#fff"}/>
            </PressableButton>
        </View>
        <View style={styles.navigationBar}>
        <Video 
        
            source={{uri:  'https://www.aranacorp.com/wp-content/uploads/rovy-avoiding-obstacles.mp4'}} 
            ref={videoRef}
            style={styles.backgroundVideo} />
        </View>
 
    </ScrollView>

  )

}

export default RaceVideo;

let ERROR_COLOR = "#C84B31"; //4E9F3D
let TEXT_COLOR = "#ECDBBA"; //D8E9A8
var styles = StyleSheet.create({
navigationBar: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    },
  mainTitle:{
    color: TEXT_COLOR,
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: ERROR_COLOR,
  },

  backgroundVideo: {
    width: 300, 
    height: 200,
    backgroundColor: 'black'
  },
});




