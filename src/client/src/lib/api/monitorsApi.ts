import { performApiCall } from './utils';

const monitorsApi = {
    getMyMonitors,
    getMyMonitorSummary,
    fetchMonitorsFromUptimeRobot,
    createMonitor,
};

async function createMonitor(params: { displayName: string; frequency: number; url: string }) {
    const URI = `me/monitors`;
    return performApiCall<monitorType>(URI, 'POST', params);
}

type monitorType = { id: string; name: string; displayName: string };

async function getMyMonitors() {
    const URI = `me/monitors`;
    return performApiCall<monitorType[]>(URI, 'GET');
}

type appMonitorDtoType = { displayName: string; frequency: number; url: string };

async function fetchMonitorsFromUptimeRobot(uptimeRobotApiKey: string) {
    const URI = `uptime-robot/monitors`;
    return performApiCall<appMonitorDtoType[]>(URI, 'POST', { uptimeRobotApiKey });
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
export type { appMonitorDtoType };
