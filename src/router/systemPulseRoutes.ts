import Joi from 'joi';
import { buildSystemPulseController } from '../modules/systemPulse';
import { routeType } from './types';

const systemPulseController = buildSystemPulseController();

const systemPulseRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'POST',
        path: '/systemPulses',
        controller: systemPulseController.createSystemPulse,
        schema: Joi.object({
            name: Joi.string()
                .required()
                .regex(/^[a-zA-Z0-9-_]+$/),
        }),
    },
    {
        method: 'GET',
        path: '/systemPulses/:name/health',
        controller: systemPulseController.assertIsSystemPulseUpByName,
    },

    {
        method: 'GET',
        path: '/systemPulses',
        controller: systemPulseController.getSystemPulses,
    },
    {
        method: 'GET',
        path: '/systemPulses/:systemPulseId/summary',
        controller: systemPulseController.getSystemPulseSummary,
    },
    {
        method: 'GET',
        path: '/all-systemPulses',
        controller: systemPulseController.getAllSystemPulses,
    },
    {
        method: 'POST',
        path: '/clients/:systemPulseId/pings',
        controller: systemPulseController.pingSystemPulse,
    },
];

export { systemPulseRoutes };
