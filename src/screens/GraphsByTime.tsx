import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Colors} from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import PressableButton from "../components/PressableButton.tsx";
import {CircleArrowLeft} from "lucide-react-native";
import { Dimensions } from "react-native";

export default function GraphsByTime() {
    const [sessionLogs, setSessionLogs] = useState([]);
    const [sortedSessionLogs, setSortedSessionLogs] = useState([]);
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const navigation = useNavigation();
    const screenWidth = Dimensions.get("window").width;

    const fetchSessionLogs = async () => {
        try {
            const response = await fetch("https://9g526.wiremockapi.cloud/session/stats");
            if (!response.ok) {
                throw new Error(`Failed to fetch session logs: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setSessionLogs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching session logs:', error);
            setError('Failed to fetch session logs. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessionLogs();
    }, []);

    console.log(sessionLogs);


    useEffect(() => {
        const sortAndFilterSessionLogs = () => {
            let sortedData: any = [...sessionLogs];
            switch (sortBy) {
                case 'date':
                    sortedData.sort((a, b) => {
                        const dateA = new Date(a.start_time.split(' - ')[0]);
                        const dateB = new Date(b.start_time.split(' - ')[0]);
                        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                    });
                    break;
                case 'collisions':
                    sortedData.sort((a:any, b:any) => {
                        const sumA = a.collisions.reduce((acc:any, item:any) => acc + item.count, 0) || 0;
                        const sumB = b.collisions.reduce((acc:any, item:any) => acc + item.count, 0) || 0;
                        return sortOrder === 'asc' ? sumA - sumB : sumB - sumA;
                    });
                    break;
                case 'lineLosses':
                    sortedData.sort((a:any, b:any) => {
                        const sumA = a.tracks.reduce((acc:any, item:any) => acc + item.count, 0) || 0;
                        const sumB = b.tracks.reduce((acc:any, item:any) => acc + item.count, 0) || 0;
                        return sortOrder === 'asc' ? sumA - sumB : sumB - sumA;
                    });
                    break;
                default:
                    sortedData = [...sessionLogs];
            }
            setSortedSessionLogs(sortedData);
        };

        sortAndFilterSessionLogs();
    }, [sortBy, sortOrder, sessionLogs]);

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const renderCharts = (item: any) => {
        switch (sortBy) {
            case 'date':
                return (
                    <>
                        <View style={styles.chartContainer}>
                            <Text style={styles.chartLabel}>Collisions (per second)</Text>
                            <BarChart
                                data={{
                                    labels: item.collisions[0].timestamps,
                                    datasets: [{
                                        data: item.collisions[0].distances,
                                    }],
                                }}
                                width={Platform.OS === 'web' ? wp('60%') : wp('90%')}
                                height={hp('30%')}
                                chartConfig={{
                                    backgroundGradientFrom: '#ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                style={styles.chart}
                            />
                        </View>
                        <View style={styles.chartContainer}>
                            <Text style={styles.chartLabel}>Line Losses (per minute)</Text>
                            <BarChart
                                data={{
                                    labels: item.tracks[0].timestamps,
                                    datasets: [{
                                        data: item.tracks[0].line_tracking_values,
                                    }],
                                }}
                                width={Platform.OS === 'web' ? wp('60%') : wp('90%')}
                                height={hp('30%')}
                                chartConfig={{
                                    backgroundGradientFrom: '#ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                style={styles.chart}
                            />
                        </View>
                    </>
                );
            case 'collisions':
                return (
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartLabel}>Collisions (per second)</Text>
                        <BarChart
                            data={{
                                labels: item.collisions[0].timestamps,
                                datasets: [{
                                    data: item.collisions[0].distances,
                                }],
                            }}
                            width={Platform.OS === 'web' ? wp('60%') : screenWidth}
                            height={hp('30%')}
                            chartConfig={{
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            style={styles.chart}
                        />
                    </View>
                );
            case 'lineLosses':
                return (
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartLabel}>Line Losses (per minute)</Text>
                        <BarChart
                            data={{
                                labels: item.tracks[0].timestamps,
                                datasets: [{
                                    data: item.tracks[0].line_tracking_values,
                                }],
                            }}
                            width={Platform.OS === 'web' ? wp('60%') : screenWidth}
                            height={hp('30%')}
                            chartConfig={{
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            style={styles.chart}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.errorContainer]}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.buttonContainer}>
                <PressableButton
                    css={{backgroundColor:Colors.light.primaryGreen, maxWidth: 30, alignItems: "center", justifyContent: "center"}}
                    onPress={() => navigation.goBack()}
                >
                    <CircleArrowLeft color={"#fff"}/>
                </PressableButton>
            </View>
            <Text style={styles.header}>Stats on timeline</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.sortButton, sortBy === 'date' && styles.activeSortButton]}
                    onPress={() => {
                        setSortBy('date');
                        toggleSortOrder();
                    }}
                >
                    <Text style={sortBy === 'date' ? styles.activeText : styles.sortButtonText}>Sort by Date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortButton, sortBy === 'collisions' && styles.activeSortButton]}
                    onPress={() => {
                        setSortBy('collisions');
                        toggleSortOrder();
                    }}
                >
                    <Text style={sortBy === 'collisions' ? styles.activeText : styles.sortButtonText}>Sort by Collisions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortButton, sortBy === 'lineLosses' && styles.activeSortButton]}
                    onPress={() => {
                        setSortBy('lineLosses');
                        toggleSortOrder();
                    }}
                >
                    <Text style={sortBy === 'lineLosses' ? styles.activeText : styles.sortButtonText}>Sort by Line Losses</Text>
                </TouchableOpacity>
            </View>

            {sortedSessionLogs.map((item, index) => (
                <View key={index} style={styles.logItem}>
                    {/*<Text style={styles.logText}>Start Time</Text>*/}
                    {renderCharts(item)}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'flex-start',
        paddingTop: hp('3%'),
        paddingHorizontal: wp('5%'),
    },
    header: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: hp('3%'),
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
        width: '100%',
        marginBottom: hp('2%'),
    },
    sortButton: {
        maxWidth: 250,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        borderRadius: 8,
        backgroundColor: Colors.dark.primaryGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortButtonText: {
        fontSize: wp('4%'),
        color: Colors.light.text,
    },
    activeSortButton: {
        backgroundColor: Colors.dark.mainBackground,
    },
    activeText: {
        color: Colors.dark.primaryGreen,
    },
    logItem: {
        marginBottom: hp('2%'),
        padding: wp('2%'),
        borderRadius: 10,
        width: '100%',
    },
    logText: {
        fontSize: wp('4%'),
        color: Colors.light.text,
        marginBottom: hp('1%'),
    },
    chartContainer: {
        marginTop: hp('1%'),
    },
    chartLabel: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: hp('1%'),
    },
    chart: {
        marginVertical: hp('1%'),
        borderRadius: 16,
    },
    loadingContainer: {
        justifyContent: 'center',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: wp('4%'),
        color: 'red',
        textAlign: 'center',
    },
});

