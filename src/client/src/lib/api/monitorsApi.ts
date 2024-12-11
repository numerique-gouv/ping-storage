import { BASE_URL } from './constants';
import { performApiCall } from './utils';

const monitorsApi = { getMyMonitors, createMonitor };

async function createMonitor(params: {
    displayName: string;
    frequency: number;
    url: string;
}): Promise<monitorType> {
    const URL = `${BASE_URL}/me/monitors`;
    return performApiCall(URL, 'POST', params);
}

type monitorType = { id: string; name: string; displayName: string };

async function getMyMonitors(): Promise<monitorType[]> {
    const URL = `${BASE_URL}/me/monitors`;
    return performApiCall(URL, 'GET');
}

export { monitorsApi };
