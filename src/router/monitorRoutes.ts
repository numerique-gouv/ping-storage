import Joi from 'joi';
import { buildMonitorController } from '../modules/monitor';
import { routeType } from './types';

const monitorController = buildMonitorController();

const monitorRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'POST',
        path: '/monitors',
        controller: monitorController.createMonitor,
        schema: Joi.object({
            frequency: Joi.number().greater(1).required(),
            name: Joi.string()
                .required()
                .regex(/^[a-zA-Z0-9-_]+$/),
        }),
    },
];

export { monitorRoutes };
