import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';
import { Monitors } from '../pages/Monitors/Monitors';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { TermsAndConditionsOfSale } from '../pages/TermsAndConditionsOfSale';
import { MonitorSummary } from '../pages/MonitorSummary';
import { ImportFromUptimeRobot } from '../pages/ImportFrom/ImportFromUptimeRobot';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    IMPORT_FROM_UPTIME_ROBOT: { element: <ImportFromUptimeRobot /> },
    MONITORS: { element: <Monitors /> },
    MONITOR_SUMMARY: { element: <MonitorSummary /> },
    SIGN_IN: { element: <SignIn /> },
    SIGN_UP: { element: <SignUp /> },
    TERMS_AND_CONDITIONS_OF_SALE: { element: <TermsAndConditionsOfSale /> },
};

export { ROUTE_ELEMENTS };
