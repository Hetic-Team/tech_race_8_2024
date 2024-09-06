import { SESSION_URL } from '../constants/Urls';

// @ts-ignore
import axios from 'axios';
// WebSocketHelper.js
export default class ActionHelper {
    /**
     * Start Manual Session
     * @returns {Promise<any>}
     */
    static async startManualSession() { 
        return new Promise((resolve, reject) => {
            axios.get(`http://${SESSION_URL}/sessions/start/0`)
            // @ts-ignore
            .then((response) => {
                resolve(response.data);
            })
            // @ts-ignore
            .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Starts the automatic session
     * @returns 
     */
    static async startAutomaticSession() { 
        return new Promise((resolve, reject) => {
            axios.get(`http://${SESSION_URL}/sessions/start/1`)
            // @ts-ignore
            .then((response) => {
                resolve(response.data);
            })
            // @ts-ignore
            .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Stops the current session
     * @returns {Promise<any>}
     */
    static async stopSession() { 
        return new Promise((resolve, reject) => {
            axios.get(`http://${SESSION_URL}/sessions/stop`)
            // @ts-ignore
            .then((response) => {
                resolve(response.data);
            })
            // @ts-ignore
            .catch((error) => {
                reject(error);
            });
        });
    }
    
  }
  