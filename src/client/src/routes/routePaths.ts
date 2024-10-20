import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    HOME: {
        path: '/',
    },
    CLIENT_SUMMARY: {
        path: '/clients/:clientId',
    },
    CLIENTS: {
        path: '/clients',
    },
};

export { ROUTE_PATHS };
