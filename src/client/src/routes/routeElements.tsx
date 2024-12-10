import { SystemPulseSummary } from '../pages/SystemPulseSummary';
import { SystemPulses } from '../pages/SystemPulses';
import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';
import { Monitors } from '../pages/Monitors/Monitors';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { TermsAndConditionsOfSale } from '../pages/TermsAndConditionsOfSale';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    SYSTEM_PULSES: { element: <SystemPulses /> },
    SYSTEM_PULSE_SUMMARY: { element: <SystemPulseSummary /> },
    MONITORS: { element: <Monitors /> },
    SIGN_IN: { element: <SignIn /> },
    SIGN_UP: { element: <SignUp /> },
    TERMS_AND_CONDITIONS_OF_SALE: { element: <TermsAndConditionsOfSale /> },
};

export { ROUTE_ELEMENTS };
