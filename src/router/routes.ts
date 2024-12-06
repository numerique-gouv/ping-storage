import { systemPulseRoutes } from './systemPulseRoutes';
import { eventRoutes } from './eventRoutes';
import { routeType } from './types';
import { monitorRoutes } from './monitorRoutes';

const routes = buildRoutes();

function buildRoutes() {
    const routes: routeType<any, any, any>[] = [];
    routes.push(...systemPulseRoutes);
    routes.push(...eventRoutes);
    routes.push(...monitorRoutes);
    return routes;
}

export { routes };
