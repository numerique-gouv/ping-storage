import { Monitor } from '../monitor/Monitor.entity';
import { MonitorEvent } from './MonitorEvent.entity';
import { buildMonitorEventService } from './monitorEvent.service';

describe('monitorEvent.service', () => {
    describe('aggregateEvents', () => {
        const monitorEventService = buildMonitorEventService();
        it('should return undefined if no events', () => {
            const events = [] as any[];
            const now = 10800000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 0, upPercentage: undefined },
                { timestamp: 3600000, upPercentage: undefined },
                { timestamp: 7200000, upPercentage: undefined },
            ]);
        });

        it('should return 100% if only one up event that happened before all', () => {
            const event = monitorEventFactory.buildMonitorEvent({ kind: 'up', timestamp: 0 });
            const events = [event];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: 100 },
                { timestamp: 7200000, upPercentage: 100 },
                { timestamp: 10800000, upPercentage: 100 },
            ]);
        });

        it('should return 0% if only one down event that happened before all', () => {
            const event = monitorEventFactory.buildMonitorEvent({ kind: 'down', timestamp: 0 });
            const events = [event];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: 0 },
                { timestamp: 7200000, upPercentage: 0 },
                { timestamp: 10800000, upPercentage: 0 },
            ]);
        });
        it('should return one range 100% if only one event that happened before the last range', () => {
            const event = monitorEventFactory.buildMonitorEvent({
                kind: 'up',
                timestamp: 10800000,
            });
            const events = [event];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: undefined },
                { timestamp: 7200000, upPercentage: undefined },
                { timestamp: 10800000, upPercentage: 100 },
            ]);
        });
        it('should return two ranges 0% before one range 100% if first event down and one event up that happened before the last range', () => {
            const firstEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'down',
                timestamp: 0,
            });
            const secondEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'up',
                timestamp: 10800000,
            });
            const events = [firstEvent, secondEvent];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: 0 },
                { timestamp: 7200000, upPercentage: 0 },
                { timestamp: 10800000, upPercentage: 100 },
            ]);
        });
        it('should return one ranges 0%, one range 80% if event up happened at 20% range, and one range 100% after that', () => {
            const firstEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'down',
                timestamp: 0,
            });
            const secondEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'up',
                timestamp: 7920000,
            });
            const events = [firstEvent, secondEvent];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: 0 },
                { timestamp: 7200000, upPercentage: 80 },
                { timestamp: 10800000, upPercentage: 100 },
            ]);
        });
        it('should return one ranges 100%, one range 80% if event down happened at 80% range, and one range 0% after that', () => {
            const firstEvent = monitorEventFactory.buildMonitorEvent({ kind: 'up', timestamp: 0 });
            const secondEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'down',
                timestamp: 10080000,
            });
            const events = [firstEvent, secondEvent];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: 100 },
                { timestamp: 7200000, upPercentage: 80 },
                { timestamp: 10800000, upPercentage: 0 },
            ]);
        });

        it('should return one ranges 0%, one range 50% if event up happened at mid-range, and one range 100% after that', () => {
            const firstEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'down',
                timestamp: 0,
            });
            const secondEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'up',
                timestamp: 9000000,
            });
            const events = [firstEvent, secondEvent];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: 0 },
                { timestamp: 7200000, upPercentage: 50 },
                { timestamp: 10800000, upPercentage: 100 },
            ]);
        });
        it('should return two ranges 100%, one range 40% if 2 events up happened inside a range', () => {
            const firstEvent = monitorEventFactory.buildMonitorEvent({ kind: 'up', timestamp: 0 });
            const secondEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'down',
                timestamp: 7920000,
            });
            const thirdEvent = monitorEventFactory.buildMonitorEvent({
                kind: 'up',
                timestamp: 10080000,
            });

            const events = [firstEvent, secondEvent, thirdEvent];
            const now = 14400000;

            const aggregatedEvents = monitorEventService.aggregateEvents(events, 'hours', 3, now);

            expect(aggregatedEvents).toEqual([
                { timestamp: 3600000, upPercentage: 100 },
                { timestamp: 7200000, upPercentage: 40 },
                { timestamp: 10800000, upPercentage: 100 },
            ]);
        });
    });
});

const monitorEventFactory = { buildMonitorEvent };

function buildMonitorEvent(params: {
    kind: MonitorEvent['kind'];
    timestamp: number;
}): MonitorEvent {
    const monitor = {} as Monitor;
    const createdAtDate = new Date();
    createdAtDate.setTime(params.timestamp);

    return {
        id: 1,
        monitor,
        title: 'titre',
        createdAt: createdAtDate.toISOString(),
        kind: params.kind,
    };
}
