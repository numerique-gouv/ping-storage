import { User } from '../user';
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

    async function getMyMonitors(_params: {}, user: User) {
        return monitorService.getMyMonitors(user);
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
