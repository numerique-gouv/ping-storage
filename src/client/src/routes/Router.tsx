import { Routes, Route } from 'react-router-dom';

import { ROUTE_ELEMENTS } from './routeElements';
import { ROUTE_KEYS } from './routeKeys';
import { ROUTE_PATHS } from './routePaths';
import { TitleWrapper } from './TitleWrapper';
import { ROUTE_TITLES } from './routeTitles';

function Router() {
    return (
        <Routes>
            {ROUTE_KEYS.map((routeKey) => {
                const { element } = ROUTE_ELEMENTS[routeKey];
                const { path } = ROUTE_PATHS[routeKey];
                const documentTitle = ROUTE_TITLES[routeKey];

                return (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <TitleWrapper documentTitle={documentTitle}>{element}</TitleWrapper>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export { Router };
