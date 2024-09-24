import { clientRoutes } from './clientRoutes';
import { pingRoutes } from './pingRoutes';
import { routeType } from './types';

const routes = buildRoutes();

function buildRoutes() {
    const routes: routeType<any, any, any>[] = [];
    routes.push(...clientRoutes);
    routes.push(...pingRoutes);
    return routes;
}

export { routes };
