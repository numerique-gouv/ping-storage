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
        path: '/clients/:clientName/health',
        controller: clientController.assertIsClientUp,
    },
];

export { clientRoutes };
