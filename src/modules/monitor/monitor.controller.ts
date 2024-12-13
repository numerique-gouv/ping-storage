import { User } from '../user';
import { Monitor } from './Monitor.entity';
import { buildMonitorService } from './monitor.service';

export { buildMonitorController };

function buildMonitorController() {
    const monitorService = buildMonitorService();
    const monitorController = {
        assertIsMonitorUpByName,
        getMyMonitors,
        getMyMonitorSummary,
        pingCronMonitor,
        createAppMonitor,
        createAppMonitors,
        fetchMonitorsFromUptimeRobot,
    };

    return monitorController;

    async function assertIsMonitorUpByName(params: { urlParams: { monitorName: string } }) {
        return monitorService.assertIsMonitorUpByName(params.urlParams.monitorName);
    }

    async function fetchMonitorsFromUptimeRobot(params: { body: { uptimeRobotApiKey: string } }) {
        return monitorService.fetchMonitorsFromUptimeRobot(params.body.uptimeRobotApiKey);
    }

    async function getMyMonitorSummary(params: { urlParams: { monitorId: string } }) {
        return monitorService.getMyMonitorSummary(params.urlParams.monitorId);
    }

    async function getMyMonitors(_params: {}, user: User) {
        return monitorService.getMyMonitors(user);
    }

    async function pingCronMonitor(params: { urlParams: { cronMonitorId: string } }) {
        return monitorService.pingCronMonitor(params.urlParams.cronMonitorId);
    }

    async function createAppMonitor(
        params: {
            body: {
                displayName: string;
                frequency: number;
                url: string;
            };
        },
        user: User,
    ) {
        return monitorService.createAppMonitor(
            {
                displayName: params.body.displayName,
                frequency: params.body.frequency,
                url: params.body.url,
            },
            user,
        );
    }

    async function createAppMonitors(
        params: {
            body: Array<{
                displayName: string;
                frequency: number;
                url: string;
            }>;
        },
        user: User,
    ) {
        return monitorService.createAppMonitors(params.body, user);
    }
}
