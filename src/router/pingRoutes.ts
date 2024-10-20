import { buildPingController } from '../modules/ping';
import { routeType } from './types';

const pingController = buildPingController();

const pingRoutes: Array<routeType<any, any, any>> = [
    // {
    //     method: 'POST',
    //     path: '/clients/:clientId/pings',
    //     controller: pingController.createPing,
    // },
    {
        method: 'GET',
        path: '/pings',
        controller: pingController.getAllPings,
    },
];

export { pingRoutes };
