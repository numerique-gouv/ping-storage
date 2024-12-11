import { Monitor } from '../modules/monitor';
import { MonitorEvent } from '../modules/monitorEvent';

const api = {
    fetchAllMonitors,
    fetchAllMonitorEvents,
};
const BASE_URL = 'https://ping-storage.osc-fr1.scalingo.io';

async function fetchAllMonitors(): Promise<Monitor[]> {
    const URL = `${BASE_URL}/api/all-monitors`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllMonitorEvents(): Promise<MonitorEvent[]> {
    const URL = `${BASE_URL}/api/all-monitor-events`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

export { api };
