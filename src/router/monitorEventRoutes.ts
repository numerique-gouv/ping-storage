import { buildMonitorEventController } from '../modules/monitorEvent';
import { routeType } from './types';

const monitorEventController = buildMonitorEventController();

const monitorEventRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/all-monitor-events',
        kind: 'public',
        controller: monitorEventController.getAllMonitorEvents,
    },
];

export { monitorEventRoutes };
