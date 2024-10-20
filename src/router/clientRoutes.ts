import Joi from 'joi';
import { buildClientController } from '../modules/client';
import { routeType } from './types';

const clientController = buildClientController();

const clientRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'POST',
        path: '/clients',
        controller: clientController.createClient,
        schema: Joi.object({
            name: Joi.string()
                .required()
                .regex(/^[a-zA-Z0-9-_]+$/),
        }),
    },
    {
        method: 'GET',
        path: '/clients/:name/health',
        controller: clientController.assertIsClientUp,
    },

    {
        method: 'GET',
        path: '/clients',
        controller: clientController.getClients,
    },
    {
        method: 'GET',
        path: '/clients/:clientId/summary',
        controller: clientController.getClientSummary,
    },
    {
        method: 'GET',
        path: '/all-clients',
        controller: clientController.getAllClients,
    },
    {
        method: 'POST',
        path: '/clients/:clientId/pings',
        controller: clientController.pingClient,
    },
];

export { clientRoutes };
