import {Colors} from '../constants/Colors';
import React,  {useEffect, useState} from 'react';
import {CircleArrowLeft} from 'lucide-react-native';
import {View, Text, StyleSheet, ActivityIndicator, ScrollView, Button} from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { useNavigation } from '@react-navigation/native';

// internal components
import PressableButton from '../components/PressableButton'
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
type PyramidValue = {left: number, right:number, yAxisLabel: string}


export default function VehicleData() {

  const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [telemetry, setTelemetry] = useState<RaceDatas[]>([]);
    // http://192.168.87.82 - ip de Justin avec son partage co sur Android
    const getTelemetry = async () => {
      try {
        const response = await fetch('http://10.0.2.2:9000/sessions/info');
        const json = await response.json();
        setTelemetry(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getTelemetry() 
    }, []);

    const itemCounter = (array: Array<number>, item: Array<number>) => array.flat(Infinity).filter(currentItem => item.includes(currentItem)).length;

    let collisionNumber: ChartValue[] = []
    let courseDurations: ChartValue[] = []
    let deriveLeft: PyramidValue[] = []

    const stats = telemetry.filter(item => item.collisions[0].count > 0 && item.tracks[0].count > 0)


    stats.map((telemetryData, index) => {
      if(index > (stats.length - 6)) {
        collisionNumber.push({value: telemetryData.collisions[0].count, frontColor: "#177AD5", label: telemetryData.id.toString()})
        courseDurations.push({value: parseInt(telemetryData.duration), frontColor: "#FF9F1C", label: telemetryData.id.toString()})
        deriveLeft.push({left: itemCounter(telemetryData.tracks[0].line_tracking_values, [6,3]), right: itemCounter(telemetryData.tracks[0].line_tracking_values, [4,2]), yAxisLabel:telemetryData.id.toString()})
      }
    })
    console.log(deriveLeft)
    const collisionsDatas = [...collisionNumber]
    
  return (
    <ScrollView>
        <View style={styles.navigationBar}>
          <PressableButton 
              css={{backgroundColor:Colors.light.primaryGreen, maxWidth: 30}}
              onPress={() => navigation.goBack()}
              >
              <CircleArrowLeft color={"#fff"}/>
            </PressableButton>
        </View>
        <View style={styles.container}>
        <Text style={styles.title}>Trips Statistics</Text>
        <Text style={styles.subTitle}>Events by trip</Text>
        <Text style={[styles.subTitle,styles.lastSubTitleLine]}>Only the 6 last trips are accounted</Text>

        {isLoading ? (<ActivityIndicator />) : (

          <View style={styles.chartsContainer}>
            <View>
                <Text style={styles.text}>Number of obstacles paving the way: </Text>
                <BarChart data = {collisionsDatas} 
                capColor={'rgba(78, 0, 142)'}
                barWidth={25}
                capThickness={7}
                cappedBars
                showGradient
                gradientColor={'rgba(200, 100, 244,0.8)'}
                yAxisThickness={0} 
                xAxisThickness={4} 
                noOfSections={3}
                isAnimated
                frontColor={'rgba(219, 182, 249,0.2)'}/>   
                <Text style={styles.subTitle}>x: id of each trip </Text>
                <Text style={styles.subTitle}>y: amount of obstacles</Text>   
            </View>   
            <View>
                <Text style={styles.text}>Trips duration: </Text>
                <BarChart data = {courseDurations} 
                isAnimated
                capColor={'rgba(78, 0, 142)'}
                barWidth={25}
                capThickness={7}
                cappedBars
                showGradient
                gradientColor={'rgba(200, 100, 244,0.8)'}
                yAxisThickness={0} 
                xAxisThickness={4} 
                frontColor={'rgba(219, 182, 249,0.2)'}/>   
                <Text style={styles.subTitle}>x: id of each trip </Text>
                <Text style={styles.subTitle}>y: duration of each trip (seconds)</Text>   
            </View>   
            <View>
                <Text style={styles.text}>Drift from the line by trip: </Text>
                <Text style={styles.subTitle}>x: extent of the drift to the left or right </Text>
                <Text style={styles.subTitle}>y: id of each trip </Text>   
                <PopulationPyramid data = {deriveLeft} showValuesAsBarLabels showSurplus width={300} />   
            </View> 
          </View>

        )}

        </View>
      </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  navigationBar: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  chartsContainer: {
    rowGap: 20
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
