import Joi from 'joi';
import { buildSystemPulseController } from '../modules/systemPulse';
import { routeType } from './types';

const systemPulseController = buildSystemPulseController();

const systemPulseRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'POST',
        path: '/system-pulses',
        kind: 'authenticated',
        controller: systemPulseController.createSystemPulse,
        schema: Joi.object({
            name: Joi.string()
                .required()
                .regex(/^[a-zA-Z0-9-_]+$/),
        }),
    },
    {
        method: 'GET',
        kind: 'public',
        path: '/system-pulses/:name/health',
        controller: systemPulseController.assertIsSystemPulseUpByName,
    },

    {
        method: 'GET',
        path: '/system-pulses',
        kind: 'authenticated',
        controller: systemPulseController.getSystemPulses,
    },
    {
        method: 'GET',
        kind: 'authenticated',
        path: '/system-pulses/:systemPulseId/summary',
        controller: systemPulseController.getSystemPulseSummary,
    },
    {
        method: 'GET',
        kind: 'public',
        path: '/all-system-pulses',
        controller: systemPulseController.getAllSystemPulses,
    },
    {
        method: 'POST',
        kind: 'public',
        path: '/clients/:systemPulseId/pings',
        controller: systemPulseController.pingSystemPulse,
    },
];

export { systemPulseRoutes };
