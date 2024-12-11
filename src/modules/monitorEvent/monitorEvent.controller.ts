import { buildMonitorEventService } from './monitorEvent.service';

export { buildMonitorEventController };

function buildMonitorEventController() {
    const monitorEventService = buildMonitorEventService();
    const monitorEventController = {
        getAllMonitorEvents,
    };

    return monitorEventController;

    async function getAllMonitorEvents() {
        return monitorEventService.getAllMonitorEvents();
    }
}
