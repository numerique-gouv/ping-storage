import { systemPulseRoutes } from './systemPulseRoutes';
import { eventRoutes } from './eventRoutes';
import { routeType } from './types';
import { monitorRoutes } from './monitorRoutes';
import { userRoutes } from './userRoutes';

const routes = buildRoutes();

function buildRoutes() {
    const routes: routeType<any, any, any>[] = [];
    routes.push(...systemPulseRoutes);
    routes.push(...eventRoutes);
    routes.push(...monitorRoutes);
    routes.push(...userRoutes);
    return routes;
}

export { routes };
