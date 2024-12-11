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
        createMonitor,
    };

    return monitorController;

    async function assertIsMonitorUpByName(params: { urlParams: { monitorName: string } }) {
        return monitorService.assertIsMonitorUpByName(params.urlParams.monitorName);
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

    async function createMonitor(
        params: {
            body: {
                displayName: Monitor['displayName'];
                frequency: Monitor['frequency'];
                url: Monitor['url'];
            };
        },
        user: User,
    ) {
        return monitorService.createMonitor({
            displayName: params.body.displayName,
            frequency: params.body.frequency,
            url: params.body.url,
            user,
        });
    }
}
