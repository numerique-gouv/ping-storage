import Joi from 'joi';
import { buildEventController } from '../modules/event';
import { routeType } from './types';

const eventController = buildEventController();

const eventRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/all-events',
        kind: 'public',
        controller: eventController.getAllEvents,
    },
];

export { eventRoutes };
