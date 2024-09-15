import {Colors} from '../constants/Colors';
import React,  {useEffect, useState, useRef} from 'react';
import {CircleArrowLeft, ChartColumn, ChartArea, ChartNoAxesCombined} from 'lucide-react-native';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from '../components/PressableButton'
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGetTripData from '../hooks/useGetTripData'

  type Media = {
    url: string, 
    is_autopilot: boolean,
    session_id: number,
    start_date: string,
    end_date: string,
    duration: string,
    time: string,
    hasStats: boolean
  }
  

const MyTripsData = () =>  {

  
    const [activeTab, setActiveTab] = useState('All');
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    // http://192.168.87.82 - ip de Justin avec son partage co sur Android
  
    const { isLoading, raceData } = useGetTripData()
    
    const tripsData = raceData.filter(item => item.videos.video_urls.length > 0 && parseInt(item.duration) > 0)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    let medias: Media[] = []
    let sessions: Array<number> = []
    let startDate: string;
    let endDate: string;
    let time: string;
    let hasStatsCount: number;
    const [isPaused, setIsPaused] = useState(false);

    tripsData.map((trip, index) => {

        if(index > (tripsData.length - 12)) {
            sessions.push(trip.id)
            console.log(trip)

            startDate = trip.start_time.split('-')[0].trim()
            endDate = trip.end_time.split('-')[0].trim()
            time = trip.start_time.split('-')[1].trim()
            hasStatsCount = trip.collisions[0].count + trip.tracks[0].count

            medias.push({url: trip.videos.video_urls[0], session_id: trip.id, start_date: startDate,
                end_date: endDate,
                duration:trip.duration, time: time,
                hasStats: hasStatsCount > 0,
                is_autopilot: trip.is_autopilot })
        }
      })

      const [activeData, setActiveData] = useState<Media[]>(medias)

      useEffect(() => {
        switch (activeTab) {
          case 'All':
            setActiveData(medias)
            break;
          case 'is_autopilot':
            setActiveData(medias.filter(media => media.is_autopilot))
            break;
          case 'stats':
            setActiveData(medias.filter(media => media.hasStats))
            break;
          default:
            setActiveData(medias)
        }
      }, [activeTab])

      const filterVideos = (category: string) => {
      
        switch (category) {
          case 'All':
            setActiveTab(category);
            break;
          case 'is_autopilot':
            setActiveTab(category);
            break;
          case 'stats':
            setActiveTab(category);
            break;
          default:
            setActiveTab(category);
            
        }
       
      };

    const formatDuration = (duration: string) => {
        // Match groups for hours, minutes, and seconds
        const hoursMatch = duration.match(/(\d+)h/);
        const minutesMatch = duration.match(/(\d+)m/);
        const secondsMatch = duration.match(/(\d+)s/);

        let formattedDuration = duration;

        // Check and remove '0h' or '0m'
        if (hoursMatch && hoursMatch[1] === '0') {
            formattedDuration = formattedDuration.replace(/0h\s*/, '');
        }
        if (minutesMatch && minutesMatch[1] === '0') {
            formattedDuration = formattedDuration.replace(/0m\s*/, '');
        }

        // Replace 's' with ' seconds', and handle pluralization if needed
        if (secondsMatch) {
            const secondsValue = secondsMatch[1]; // Extract the number preceding 's'
            formattedDuration = formattedDuration.replace(
                `${secondsValue}s`,
                `${secondsValue} second${secondsValue !== '1' ? 's' : ''}`
            );
        }

        // Similarly, handle pluralization for minutes and hours if needed
        if (minutesMatch && minutesMatch[1] !== '0') {
            const minutesValue = minutesMatch[1];
            formattedDuration = formattedDuration.replace(
                `${minutesValue}m`,
                `${minutesValue} minute${minutesValue !== '1' ? 's' : ''}`
            );
        }

        if (hoursMatch && hoursMatch[1] !== '0') {
            const hoursValue = hoursMatch[1];
            formattedDuration = formattedDuration.replace(
                `${hoursValue}h`,
                `${hoursValue} hour${hoursValue !== '1' ? 's' : ''}`
            );
        }

        return formattedDuration.trim(); // Return the formatted duration
    };

      const Item = ({ session_id, url, start_date, end_date, duration, time, hasStats, is_autopilot }: Media) => (
        <View
        style={[{marginHorizontal: 20, marginVertical:15, borderRadius:5, paddingHorizontal:0, backgroundColor:Colors.dark.primaryGreen}]}>
          <View style={[{position:"relative",}]}>
            <View style={[{position:'relative',width:150, marginVertical: 5, marginLeft:5,backgroundColor:Colors.dark.mainBackground}, {zIndex:999, paddingVertical:5, borderRadius:5}]}>
              <Text style={[{fontSize:18, fontWeight: "bold", textAlign:"center", color:Colors.dark.text}]}>{is_autopilot ? "Automatic" : "Manual"}</Text>
            </View>
          </View>
            {url ?
                (<TouchableOpacity style={[{borderRadius:30, paddingHorizontal:32, paddingVertical:12, backgroundColor:Colors.dark.mainBackground, maxWidth:'80%', marginHorizontal: 'auto', marginVertical: 25}]} onPress={() => navigation.navigate('SessionVideo', {videoUrl: url})}>
                <Text style={[{fontSize:18, fontWeight: "bold", textAlign:"center", color:Colors.dark.text}]} >Watch the video</Text>
            </TouchableOpacity>) : null}
          <TouchableOpacity style={[{paddingVertical:15, paddingHorizontal:10}]} onPress={() => navigation.navigate('TripGraphs', {tripId: session_id})}>
            <Text style={[{fontSize:18, fontWeight: "bold", textAlign:"center", color:Colors.dark.text}]} >{start_date} - {end_date}</Text>
            <Text style={[{fontSize:18, fontWeight: "bold", textAlign:"center", color:Colors.dark.text}]}>{time} </Text>
            <Text style={[{fontSize:16, fontWeight: "bold", textAlign:"center", color:Colors.dark.mainBackground, fontStyle: 'italic'}]}>Duration: {formatDuration(duration)}</Text>
            {hasStats ?
            (<View style={[{columnGap:10, flexDirection:"row", alignItems:"center", justifyContent:"center", paddingVertical:10}]}>
              <View style={[{borderRadius:30, paddingHorizontal:32, paddingVertical:12, backgroundColor:Colors.dark.mainBackground, columnGap:10, flexDirection:"row", alignItems:"center", justifyContent:"center"}]}>
                <ChartNoAxesCombined color={"#fff"} size={30}/>
                <ChartArea color={"#fff"} size={30}/>
                <Text style={[{color: "white", fontWeight: "bold", fontSize: 20}]}>Get statistics</Text>
              </View>
            </View>):null}
         </TouchableOpacity>
        </View>

      );

      const renderItem = ({ item }: any) => (
        <Item session_id={item.session_id} url={item.url}
        start_date={item.start_date}
        end_date={item.end_date}
        time={item.time}
        duration={item.duration}
        hasStats={item.hasStats} is_autopilot={item.is_autopilot}/>
      );

  return (
    <SafeAreaView style={{ flex: 1, rowGap:2, backgroundColor:Colors.dark.mainBackground, paddingVertical:20 }}>
        <View style={[styles.container, {flexDirection: "row", columnGap: 20}]}>
            <PressableButton
              css={{backgroundColor:Colors.light.primaryGreen, maxWidth: 30, alignItems: "center", justifyContent: "center"}}
              onPress={() => navigation.goBack()}
              >
              <CircleArrowLeft color={"#fff"}/>
            </PressableButton>
            <PressableButton
              css={{backgroundColor:Colors.light.primaryGreen, flexDirection: "row", alignItems: "center", columnGap:6}}
              onPress={() => navigation.navigate('MoreInfo')}
              >
              <ChartColumn color={"#fff"}/>
              <Text style={[{color: "white", fontWeight: "bold", fontSize: 20}]}>Compare all</Text>
            </PressableButton>


        </View>
        <View style={styles.container}>
        <Text style={styles.title}>My Trips</Text>
        <Text style={styles.subTitle}>See all your trips videos and statistics</Text>
        <Text style={[styles.subTitle,styles.lastSubTitleLine]}>Only the last trips are accounted</Text>
        </View>
        <View style={[styles.tabsContainer, styles.container]}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'All' && styles.activeTab]}
                onPress={() => filterVideos('All')}
              >
            <Text   style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'is_autopilot' && styles.activeTab]}
                onPress={() => filterVideos('is_autopilot')}
              >
                <Text style={[styles.tabText, activeTab === 'is_autopilot' && styles.activeTabText]}>With auto-pilot</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
                onPress={() => filterVideos('stats')}
              >
                <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>With statistics only</Text>
            </TouchableOpacity>
        </View>
        {isLoading ? (<ActivityIndicator />) :
        (<View style={styles.containerList}>
        <FlatList
          data={activeTab === 'All' ? medias : activeData}
          renderItem={renderItem}
          keyExtractor={(item) => item.session_id.toString()}
          numColumns={1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
        </View>)}

    </SafeAreaView>

  )

}

export default MyTripsData;

let ERROR_COLOR = "#C84B31"; //4E9F3D
let TEXT_COLOR = "#ECDBBA"; //D8E9A8
var styles = StyleSheet.create({

  cardWrapper: {},
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'flex-start',
    columnGap: 5,
    marginBottom: 5,
  },
container: {
    marginTop: 5,
    paddingHorizontal: 20,
    },
  containerList : {
    marginTop: 5,
    flex: 1
  },
  mainTitle:{
    color: TEXT_COLOR,
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: ERROR_COLOR,
  },

  backgroundVideo: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'black'
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.light.primaryGreen,
    borderRadius:5
  },
  activeTab: {
    color: 'white',
    backgroundColor: Colors.light.primaryGreen,
  },

  activeTabText: {
    color: 'white',
  },
  tabText : {
    color: 'white',
  },

  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: Colors.dark.text,
  },
  lastSubTitleLine: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },



});




