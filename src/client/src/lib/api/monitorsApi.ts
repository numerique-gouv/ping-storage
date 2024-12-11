import { performApiCall } from './utils';

const monitorsApi = { getMyMonitors, createMonitor };

async function createMonitor(params: {
    displayName: string;
    frequency: number;
    url: string;
}): Promise<monitorType> {
    const URI = `me/monitors`;
    return performApiCall(URI, 'POST', params);
}

type monitorType = { id: string; name: string; displayName: string };

async function getMyMonitors(): Promise<monitorType[]> {
    const URI = `me/monitors`;
    return performApiCall(URI, 'GET');
}

export { monitorsApi };
