import { Monitor } from './Monitor.entity';
import { buildMonitorService } from './monitor.service';

export { buildMonitorController };

function buildMonitorController() {
    const monitorService = buildMonitorService();
    const monitorController = {
        getMyMonitors,
        createMonitor,
    };

    return monitorController;

    async function getMyMonitors() {
        return monitorService.getMyMonitors();
    }

    async function createMonitor(params: {
        body: {
            displayName: Monitor['displayName'];
            frequency: Monitor['frequency'];
            url: Monitor['url'];
        };
    }) {
        return monitorService.createMonitor({
            displayName: params.body.displayName,
            frequency: params.body.frequency,
            url: params.body.url,
        });
    }
}
