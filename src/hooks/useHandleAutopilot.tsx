import React, {useEffect, useState} from 'react';
import {AUTO_PILOT, AUTO_PILOT_STOP} from "../constants/Urls";
import { Colors } from "../constants/Colors";

type Autopilot = {
    status: string,
    autopilot: string,
    message: string,
    recording: string
}

export default function useHandleAutopilot() {
    const [isAutoLoading, setLoading] = useState(true);
    const [messageAutoPilot, setMessageAutoPilot] = useState<Autopilot>({status: "", autopilot: "", message: "", recording: ""});
    const [error, setError] = useState<string | null>(null);
    const [makeAutopilot, setAutoPilot] = useState<boolean>(true)

    const getAutoPilot = async (url: string) => {

        try {
            setLoading(true)
            const response = await fetch(url);
            const json = await response.json();
            if(json.status === "success") {

                setMessageAutoPilot(json);
                setLoading(false)
            } else {
                setError('There was an error when starting the car')
                setLoading(false)
            }

        } catch (error) {
            setError('Error fetching autopilot data to start autopilot');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAutoPilot(makeAutopilot ? AUTO_PILOT : AUTO_PILOT_STOP).then(r => r)
    }, [makeAutopilot]);


    return { isAutoLoading, messageAutoPilot, error, setAutoPilot, makeAutopilot };
};

