import { pathHandler } from './pathHandler';

describe('pathHandler', () => {
    describe('getRoutePath', () => {
        it('should return the generic route path if no parameters provided', () => {
            const path = pathHandler.getRoutePath('SYSTEM_PULSES');

            expect(path).toBe('/system-pulses');
        });

        it('should return the route path with parameter', () => {
            const path = pathHandler.getRoutePath('SYSTEM_PULSE_SUMMARY', {
                systemPulseId: '219a36c4-a04e-4877-b300-000a27c0830f',
            });

            expect(path).toBe('/system-pulses/219a36c4-a04e-4877-b300-000a27c0830f');
        });
    });

    describe('extractParameters', () => {
        it('should return path with no parameter if path has no parameter', () => {
            const path = pathHandler.getRoutePath('SYSTEM_PULSES');

            const parsedPath = pathHandler.parsePath(path);

            expect(parsedPath?.routeKey).toEqual('SYSTEM_PULSES');
            expect(parsedPath?.parameters).toEqual({});
        });

        it('should return home if path is home', () => {
            const path = pathHandler.getRoutePath('HOME');

            const parsedPath = pathHandler.parsePath(path);

            expect(parsedPath?.routeKey).toEqual('HOME');
            expect(parsedPath?.parameters).toEqual({});
        });

        it('should return path with parameter if path has one parameter', () => {
            const systemPulseId = `${Math.floor(Math.random() * 10000) + 1}`;
            const path = pathHandler.getRoutePath('SYSTEM_PULSE_SUMMARY', { systemPulseId });

            const parsedPath = pathHandler.parsePath(path);

            expect(parsedPath?.routeKey).toEqual('SYSTEM_PULSE_SUMMARY');
            expect(parsedPath?.parameters).toEqual({ systemPulseId });
        });
    });
});
