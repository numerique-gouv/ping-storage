import { monitorEventRoutes } from './monitorEventRoutes';
import { routeType } from './types';
import { monitorRoutes } from './monitorRoutes';
import { userRoutes } from './userRoutes';
import { alertSubscriptionRoutes } from './alertSubscriptionRoutes';

const routes = buildRoutes();

function buildRoutes() {
    const routes: routeType<any, any, any>[] = [];
    routes.push(...monitorEventRoutes);
    routes.push(...monitorRoutes);
    routes.push(...userRoutes);
    routes.push(...alertSubscriptionRoutes);
    return routes;
}

export { routes };
