import { Clients } from '../pages/Clients';
import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';

const ROUTE_ELEMENTS: Record<(typeof ROUTE_KEYS)[number], { element: JSX.Element }> = {
    HOME: { element: <Home /> },
    CLIENTS: { element: <Clients /> },
};

export { ROUTE_ELEMENTS };
