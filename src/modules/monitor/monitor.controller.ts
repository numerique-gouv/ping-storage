import { Monitor } from './Monitor.entity';
import { buildMonitorService } from './monitor.service';

export { buildMonitorController };

function buildMonitorController() {
    const monitorService = buildMonitorService();
    const monitorController = {
        createMonitor,
    };

    return monitorController;

    async function createMonitor(params: {
        body: { name: Monitor['name']; frequency: Monitor['frequency'] };
    }) {
        return monitorService.createMonitor({
            name: params.body.name,
            frequency: params.body.frequency,
        });
    }
}
