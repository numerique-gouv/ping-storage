import { performApiCall } from './utils';

const monitorsApi = { getMyMonitors, getMyMonitorSummary, createMonitor };

async function createMonitor(params: { displayName: string; frequency: number; url: string }) {
    const URI = `me/monitors`;
    return performApiCall<monitorType>(URI, 'POST', params);
}

type monitorType = { id: string; name: string; displayName: string };

async function getMyMonitors() {
    const URI = `me/monitors`;
    return performApiCall<monitorType[]>(URI, 'GET');
}

type statusValueType = 'up' | 'down';

type eventType = { createdAt: string; kind: statusValueType; title: string; id: number };

type monitorSummaryType = {
    name: string;
    status: statusValueType;
    events: Array<eventType>;
};

async function getMyMonitorSummary(monitorId: string) {
    const URI = `me/monitors/${monitorId}/summary`;
    return performApiCall<monitorSummaryType>(URI, 'GET');
}

export { monitorsApi };
