import {Colors} from '../constants/Colors';
import React,  {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList,   ScrollView} from 'react-native';
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

type ChartValue = {value: number, label: string, frontColor: string}


export default function VehicleData() {

    const [isLoading, setLoading] = useState(true);
    const [telemetry, setTelemetry] = useState<RaceDatas[]>([]);
  
    const getMovies = async () => {
      try {
        const response = await fetch('http://192.168.87.82:9000/sessions/info');
        const json = await response.json();
        console.log(json)
        setTelemetry(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getMovies();
    }, []);

    console.log(telemetry)

    let collisionNumber: ChartValue[] = []

    telemetry.map((telemetryData, index) => {
      if(index > (telemetry.length - 6)) {
        collisionNumber.push({value: telemetryData.collisions[0].count, frontColor: "#177AD5", label: telemetryData.id.toString()})
      }
    })
   
    const collisionsDatas = [...collisionNumber]
    console.log(collisionsDatas)
  return (
    <ScrollView>
        <View style={styles.container}>
        <Text style={styles.title}>Statistiques</Text>
        <Text style={styles.subTitle}>Nombre d'évènements par courses</Text>
        <Text style={[styles.subTitle,styles.lastSubTitleLine]}>Seul les 6 dernières courses sont prises en compte</Text>

        {isLoading ? (<ActivityIndicator />) : (

          <>
              <Text style={styles.text}>Nombre d'obstacles sur le chemin: </Text>
              <BarChart data = {collisionsDatas} 
              barBorderRadius={4} 
              capColor={'rgba(78, 0, 142)'}
              barWidth={25}
              capThickness={7}
              cappedBars
              showGradient
              gradientColor={'rgba(200, 100, 244,0.8)'}
              yAxisThickness={0} 
              xAxisThickness={4} 
              frontColor={'rgba(219, 182, 249,0.2)'}/>   
              <Text style={styles.subTitle}>x: numéros des courses </Text>
              <Text style={styles.subTitle}>y: nombre d'obstacles rencontrés </Text>       
          </>










        )}

        </View>
      </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: Colors.light.text,
  },
  lastSubTitleLine: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});
