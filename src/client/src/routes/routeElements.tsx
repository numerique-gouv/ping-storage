import { SystemPulseSummary } from '../pages/SystemPulseSummary';
import { SystemPulses } from '../pages/SystemPulses';
import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';
import { Monitors } from '../pages/Monitors/Monitors';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    SYSTEM_PULSES: { element: <SystemPulses /> },
    SYSTEM_PULSE_SUMMARY: { element: <SystemPulseSummary /> },
    MONITORS: { element: <Monitors /> },
};

export { ROUTE_ELEMENTS };
