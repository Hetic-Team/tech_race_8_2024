import React, {useEffect, useState} from 'react';
import {AUTO_PILOT, AUTO_PILOT_STOP} from "../constants/Urls";
import { Colors } from "../constants/Colors";

type Autopilot = {
    message: string;
    color: string;
}
export default function useHandleAutopilot() {
    const [isLoading, setLoading] = useState(true);
    const [messageAutoPilot, setMessageAutoPilot] = useState<Autopilot>({message: "", color: Colors.dark.placeholder});
    const [error, setError] = useState<string | null>(null);
    const [makeAutopilot, setAutoPilot] = useState<boolean>(false)

    const getAutoPilot = async () => {
        try {
            const response = await fetch(makeAutopilot ? AUTO_PILOT: AUTO_PILOT_STOP);
            const json = await response.text();
            setMessageAutoPilot({ message: json, color: json === "session started" ? Colors.dark.primaryGreen : Colors.dark.placeholder });
            console.log('message', json)
            console.log("loading state", isLoading)
        } catch (error) {
            setError('Error fetching autopilot data to start autopilot');
            console.error('start autopilot failed: ', error);
        } finally {
            setLoading(false);
            console.log("loading: ", isLoading)
        }
    };

    useEffect(() => {
        getAutoPilot()
    }, [makeAutopilot]);


    return { isLoading, messageAutoPilot, error, setAutoPilot, makeAutopilot };
};

