import { useEffect, useState } from "react";

export interface Videos {
  video_urls: any[]
}


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

export default function useGetTripData() {
    const [isLoading, setLoading] = useState(true);
    const [raceData, setRaceData] = useState<RaceDatas[]>([]);


    const getTripData = async () => {
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
    getTripData();
  },[])

  return { raceData, isLoading, setRaceData };    
}

