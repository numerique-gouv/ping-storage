import Joi from 'joi';
import { buildMonitorController } from '../modules/monitor';
import { routeType } from './types';

const monitorController = buildMonitorController();

const monitorRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/me/monitors',
        kind: 'authenticated',
        controller: monitorController.getMyMonitors,
    },
    {
        method: 'POST',
        path: '/me/monitors',
        kind: 'authenticated',
        controller: monitorController.createMonitor,
        schema: Joi.object({
            frequency: Joi.number().greater(0).required(),
            url: Joi.string().required(),
            displayName: Joi.string().required(),
        }),
    },
    {
        method: 'GET',
        kind: 'authenticated',
        path: '/me/monitors/:monitorId/summary',
        controller: monitorController.getMyMonitorSummary,
    },
    {
        method: 'POST',
        kind: 'public',
        path: '/clients/:cronMonitorId/pings',
        controller: monitorController.pingCronMonitor,
    },
    {
        method: 'GET',
        kind: 'public',
        path: '/monitors/:monitorName/health',
        controller: monitorController.assertIsMonitorUpByName,
    },
    {
        method: 'POST',
        kind: 'authenticated',
        path: '/uptime-robot/monitors',
        controller: monitorController.fetchMonitorsFromUptimeRobot,
    },
];

export { monitorRoutes };
