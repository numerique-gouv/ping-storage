import { performApiCall } from './utils';

const monitorsApi = { getMyMonitors, createMonitor };

async function createMonitor(params: { displayName: string; frequency: number; url: string }) {
    const URI = `me/monitors`;
    return performApiCall<monitorType>(URI, 'POST', params);
}

type monitorType = { id: string; name: string; displayName: string };

async function getMyMonitors() {
    const URI = `me/monitors`;
    return performApiCall<monitorType[]>(URI, 'GET');
}

export { monitorsApi };
