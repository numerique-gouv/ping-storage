import Joi from 'joi';
import { buildUserController } from '../modules/user';
import { routeType } from './types';
import { buildAlertSubscriptionController } from '../modules/alertSubscription';

const alertSubcriptionController = buildAlertSubscriptionController();

const alertSubscriptionRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'POST',
        path: '/monitors/:monitorId/alert-subscriptions',
        kind: 'public',
        controller: alertSubcriptionController.createAlertSubscription,
        schema: Joi.object({
            email: Joi.string().required(),
        }),
    },
];

export { alertSubscriptionRoutes };
