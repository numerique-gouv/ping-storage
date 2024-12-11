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
    MONITORS: { path: '/monitors' },
    MONITOR_SUMMARY: {
        path: '/monitors/:monitorId',
    },
    SIGN_IN: { path: '/sign-in' },
    SIGN_UP: { path: '/sign-up' },
    TERMS_AND_CONDITIONS_OF_SALE: { path: '/terms-and-conditions-of-sale' },
};

export { ROUTE_PATHS };
