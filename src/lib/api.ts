import { SystemPulse } from '../modules/systemPulse';
import { Event } from '../modules/event';

const api = {
    fetchAllSystemPulses,
    fetchAllEvents,
};
const BASE_URL = 'https://ping-storage.osc-fr1.scalingo.io';

async function fetchAllSystemPulses(): Promise<SystemPulse[]> {
    const URL = `${BASE_URL}/api/all-system-pulses`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllEvents(): Promise<Event[]> {
    const URL = `${BASE_URL}/api/all-events`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

export { api };
