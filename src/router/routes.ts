import { systemPulseRoutes } from './systemPulseRoutes';
import { eventRoutes } from './eventRoutes';
import { routeType } from './types';

const routes = buildRoutes();

function buildRoutes() {
    const routes: routeType<any, any, any>[] = [];
    routes.push(...systemPulseRoutes);
    routes.push(...eventRoutes);
    return routes;
}

export { routes };
