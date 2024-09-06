import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import {AUTO_PILOT, INFO_URL} from "@/src/constants/Urls.ts";
import {RaceDatas} from "@/src/hooks/useGetTripData.tsx";


type Autopilot = {

}
export default function useStartAutopilot() {
    const [isLoading, setLoading] = useState(true);
    const [runAutopilot, setAutoPilot] = useState<Autopilot[]>([]);

    const getTripData = async () => {
        try {
            const response = await fetch(AUTO_PILOT);
            const json = await response.json();

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTripData()
    }, []);


    return { isLoading, runAutopilot };
};

