import {Colors} from '../constants/Colors';
import React from 'react';
import {CircleArrowLeft, Frown} from 'lucide-react-native';
import {View, Text, StyleSheet, ActivityIndicator, ScrollView, Button} from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import {useRoute, RouteProp} from '@react-navigation/native';
import useGetTripData from '../hooks/useGetTripData'
type TripGraphRouteProp = RouteProp<RootStackParamList, 'TripGraphs'>;
// internal components
import PressableButton from '../components/PressableButton'

type ChartValue = {value: number, label: string}

export default function TripGraphs() {

    const navigation = useNavigation();
    const route = useRoute<TripGraphRouteProp>();
    const {tripId} = route.params;

    const { isLoading, raceData } = useGetTripData()

    let collisionsValues: ChartValue[] = []
    let driftValues: ChartValue[] = []

    const tripStats = raceData.find(item => item.id === tripId && (item.collisions[0].count > 0 || item.tracks[0].count > 0))

    if(tripStats) {
        tripStats.collisions.filter(stats => stats.distances.length > 0 && stats.timestamps.length > 0 && stats.timestamps.length === stats.distances.length).map((stats: any) => {
            console.log('trip stats', stats)
            stats.distances.map((distance:any, index:number) => {
                collisionsValues.push({value:distance, label:stats.timestamps[index]})
            })

        })
    }


    if(tripStats) {
        tripStats.tracks.filter(stats => stats.line_tracking_values.length > 0 && stats.timestamps.length > 0 && stats.line_tracking_values.length === stats.timestamps.length).map((stats: any) => {
            console.log('trip stats', stats)
            stats.line_tracking_values.map((line_tracking_value:any, index:number) => {
                driftValues.push({value:line_tracking_value, label:stats.timestamps[index]})
            })

        })
    }

    if(!tripStats && !isLoading && (!collisionsValues.length || !driftValues.length)) {
        return (
            <View style={[{paddingHorizontal: 20, paddingVertical: 30}]}>
                <View>
                    <PressableButton
                        css={{backgroundColor:Colors.light.primaryGreen, maxWidth: 30, padding:5, alignItems: "center", justifyContent: "center"}}
                        onPress={() => navigation.goBack()}
                    >
                        <CircleArrowLeft color={"#fff"}/>
                    </PressableButton>
                </View>
                <View style={[{ borderColor: Colors.light.primary, borderRadius:5, borderWidth:2, paddingHorizontal:20, paddingVertical:40, marginVertical:30}]}>
                    <Frown style={[{marginVertical: 5, marginHorizontal: 'auto'}]} size={75} color={Colors.dark.primaryGreen}/>
                    <Text style={[styles.subTitle, {marginVertical:10, textAlign: "center"}]}>This trip has not encountered any obstacles or trigger other events that we can analyse so there are no statistics to release.</Text>
                </View>
            </View>
        )
    }

    const collisionValuesNoDouble:ChartValue[] = [...new Set(collisionsValues)];
    return (
        <ScrollView>
            <View style={styles.navigationBar}>
                <PressableButton
                    css={{backgroundColor:Colors.light.primaryGreen, maxWidth: 30, alignItems: "center", justifyContent: "center"}}
                    onPress={() => navigation.goBack()}
                >
                    <CircleArrowLeft color={"#fff"}/>
                </PressableButton>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Trip Statistics  </Text>
                <Text style={[styles.lastSubTitleLine, {color: Colors.dark.primaryGreen, fontWeight: "bold", fontSize: 16}]}>This trip started on {tripStats?.start_time.split('-')[0].trim()} at {tripStats?.start_time.split('-')[1].trim()}</Text>

                <Text style={[styles.subTitle,styles.lastSubTitleLine]}>Only the 6 last trips are accounted</Text>

                {isLoading ? (<ActivityIndicator />) : (

                    <View style={styles.chartsContainer}>
                        {collisionValuesNoDouble.length > 0 ?
                            (<View>
                                <Text style={styles.text}>Distance from obstacles during the trip: </Text>
                                <View  style={[{marginVertical:20}]} >
                                    <LineChart
                                        data={collisionValuesNoDouble}
                                        color={'#177AD5'}
                                        thickness={3}
                                        dataPointsColor={'red'}
                                        width={300}
                                    />
                                </View>
                                <Text style={styles.subTitle}>y: distances from obstacle in cm </Text>
                                <Text style={styles.subTitle}>x: Time of the events in seconds</Text>
                            </View>) : null}
                        {driftValues.length > 0 ? (
                            <View>
                                <Text style={styles.text}>Change in directions : </Text>
                                <View  style={[{marginVertical:20}]} >
                                    <LineChart
                                        data={driftValues}
                                        color={'#177AD5'}
                                        thickness={3}
                                        dataPointsColor={'red'}
                                        width={300}
                                    />
                                </View>
                                <Text style={styles.subTitle}>y: directions change from the line </Text>
                                <Text style={styles.subTitle}>x: Time of the events in seconds</Text>
                            </View>
                        ): null}
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
        rowGap: 20,
        marginBottom: 20
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
