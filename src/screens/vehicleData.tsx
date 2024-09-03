import {Colors} from '../constants/Colors';
import React,  {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface RaceDatas {
  id: number
  start_time: string
  end_time: string
  duration: string
  is_autopilot: boolean
  videos: Videos
  collisions: Collision[]
  tracks: Track[]
}

export interface Videos {
  video_urls: any[]
}

export interface Collision {
  count: number
  distances: any[]
  timestamps: any[]
}

export interface Track {
  count: number
  line_tracking_values: number[]
  timestamps: string[]
}



export default function VehicleData() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<RaceDatas[]>([]);
  
    const getMovies = async () => {
      try {
        const response = await fetch('http://192.168.87.82:9000/sessions/info');
        const json = await response.json();
        console.log(json)
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getMovies();
    }, []);

    console.log(data)

    const datas=[ {value:50}, {value:80}, {value:90}, {value:70} ]
  
  return (
    <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}) => id.toString()}
            renderItem={({item}) => (
              <Text>
                Durée: {item.duration}
              </Text>
            )}
          />
        )}


    
      <LineChart data = {datas} />
   
      <LineChart data = {datas} areaChart />

      </View>
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
});
