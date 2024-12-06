import { SystemPulseSummary } from '../pages/ClientSummary';
import { SystemPulses } from '../pages/SystemPulses';
import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    SYSTEM_PULSES: { element: <SystemPulses /> },
    SYSTEM_PULSE_SUMMARY: { element: <SystemPulseSummary /> },
};

export { ROUTE_ELEMENTS };
