import { pathHandler } from './pathHandler';

describe('pathHandler', () => {
    describe('getRoutePath', () => {
        it('should return the generic route path if no parameters provided', () => {
            const path = pathHandler.getRoutePath('MONITORS');

            expect(path).toBe('/monitors');
        });

        it('should return the route path with parameter', () => {
            const path = pathHandler.getRoutePath('MONITOR_SUMMARY', {
                monitorId: '219a36c4-a04e-4877-b300-000a27c0830f',
            });

            expect(path).toBe('/monitors/219a36c4-a04e-4877-b300-000a27c0830f');
        });
    });

    describe('extractParameters', () => {
        it('should return path with no parameter if path has no parameter', () => {
            const path = pathHandler.getRoutePath('MONITORS');

            const parsedPath = pathHandler.parsePath(path);

            expect(parsedPath?.routeKey).toEqual('MONITORS');
            expect(parsedPath?.parameters).toEqual({});
        });

        it('should return home if path is home', () => {
            const path = pathHandler.getRoutePath('HOME');

            const parsedPath = pathHandler.parsePath(path);

            expect(parsedPath?.routeKey).toEqual('HOME');
            expect(parsedPath?.parameters).toEqual({});
        });

        it('should return path with parameter if path has one parameter', () => {
            const monitorId = `${Math.floor(Math.random() * 10000) + 1}`;
            const path = pathHandler.getRoutePath('MONITOR_SUMMARY', { monitorId });

            const parsedPath = pathHandler.parsePath(path);

            expect(parsedPath?.routeKey).toEqual('MONITOR_SUMMARY');
            expect(parsedPath?.parameters).toEqual({ monitorId });
        });
    });
});
