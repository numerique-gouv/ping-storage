import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    HOME: {
        path: '/',
    },
    SYSTEM_PULSE_SUMMARY: {
        path: '/system-pulses/:systemPulseId',
    },
    SYSTEM_PULSES: {
        path: '/system-pulses',
    },
};

export { ROUTE_PATHS };
