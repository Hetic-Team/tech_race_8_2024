import {Colors} from '../constants/Colors';
import React,  {useEffect, useState, useRef} from 'react';
import {CircleArrowLeft} from 'lucide-react-native';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import PressableButton from '../components/PressableButton'
import {Cloudinary} from "@cloudinary/url-gen";

// Create and configure your Cloudinary instance.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtgt8j8u8'
  }
}); 

export interface RaceDatas {
    id: number
    start_time: string
    end_time: string
    duration: string
    is_autopilot: boolean
    videos: Videos
  } 
  
  export interface Videos {
    video_urls: any[]
  }

  type Media = {url: string, session_id: number}
  

const RaceVideo = () =>  {

    const [isLoading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [raceData, setRaceData] = useState<RaceDatas[]>([]);
    // http://192.168.87.82 - ip de Justin avec son partage co sur Android
    const getRaceData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:9000/sessions/info');
        const json = await response.json();
        setRaceData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getRaceData() 
    }, []);

    const filterVideos = (category: string) => {
      setActiveTab(category);
    };

    const videosData = raceData.filter(item => item.videos.video_urls.length > 0 && parseInt(item.duration) > 0)

    // Instantiate a CloudinaryVideo object for the video with public ID, 'elephants'.
    const myVideo = cld.video('test');

    // Get the URL of the video.
    const myURL = myVideo.toURL();

    const videoRef = useRef<VideoRef>(null);
    const navigation = useNavigation();
    let medias: Media[] = []
    let sessions: Array<number> = []

    videosData.map((mediaData, index) => {
        if(index > (videosData.length - 6)) {
            sessions.push(mediaData.id)
            mediaData.videos.video_urls.map((url, index) => {
                medias.push({url: url, session_id: mediaData.id})
            })
        }
      })

      const Item = ({ session_id, url }: any) => (
        <View style={styles.container}>
        <Video 
            controls={true}
            source={{uri:  url}} 
            ref={videoRef}
            style={styles.backgroundVideo} />
        </View>
      );
      
      const renderItem = ({ item }: any) => (
        <Item session_id={item.session_id} url={item.url} />
      );
    
      console.log(medias)
  return (
    <View style={{ flex: 1, rowGap:2 }}>
        <View style={styles.container}>
            <PressableButton 
              css={{backgroundColor:Colors.light.primaryGreen, maxWidth: 30}}
              onPress={() => navigation.goBack()}
              >
              <CircleArrowLeft color={"#fff"}/>
            </PressableButton>
        </View>
        <View style={styles.container}>
        <Text style={styles.title}>Videos</Text>
        <Text style={styles.subTitle}>See videos taken by your vehicle</Text>
        <Text style={[styles.subTitle,styles.lastSubTitleLine]}>Only the 6 last trips are accounted</Text>
        </View>
        <View style={[styles.tabsContainer, styles.container]}>  

          <TouchableOpacity
            style={[styles.tab, activeTab === 'All' && styles.activeTab]}
            onPress={() => filterVideos('All')}
          >
            <Text   style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          
          {sessions.map((session) => {
            return (
              <TouchableOpacity
                key={session}
                style={[styles.tab, activeTab === session.toString() && styles.activeTab]}
                onPress={() => filterVideos(session.toString())}
              >
                <Text   style={[styles.tabText, activeTab === session.toString() && styles.activeTabText]}>Trip n° {session}</Text>
              </TouchableOpacity>
            )
          })}

        </View>
        <View style={styles.containerList}>
          <FlatList
          data={activeTab === 'All' ? medias : medias.filter(media => media.session_id.toString() === activeTab)}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          numColumns={1}
        />
      </View>

    </View>

  )

}

export default RaceVideo;

let ERROR_COLOR = "#C84B31"; //4E9F3D
let TEXT_COLOR = "#ECDBBA"; //D8E9A8
var styles = StyleSheet.create({
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
    width: 300, 
    height: 200,
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
    color: 'black',
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




