import Joi from 'joi';
import { buildMonitorController } from '../modules/monitor';
import { routeType } from './types';

const monitorController = buildMonitorController();

const monitorRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/me/monitors',
        controller: monitorController.getMyMonitors,
    },
    {
        method: 'POST',
        path: '/me/monitors',
        controller: monitorController.createMonitor,
        schema: Joi.object({
            frequency: Joi.number().greater(0).required(),
            url: Joi.string().required(),
            displayName: Joi.string().required(),
        }),
    },
];

export { monitorRoutes };
