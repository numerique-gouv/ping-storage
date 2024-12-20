import { dataSource } from '../../dataSource';
import { generateArray } from '../../lib/utils';
import { Monitor } from '../monitor';
import { MonitorEvent } from './MonitorEvent.entity';

export { buildMonitorEventService };

function buildMonitorEventService() {
    const monitorEventRepository = dataSource.getRepository(MonitorEvent);

    const monitorMonitorEventService = {
        getAllMonitorEvents,
        createMonitorEvent,
        getLastMonitorEvent,
        getEventsForMonitor,
        aggregateEvents,
    };

    return monitorMonitorEventService;

    async function getAllMonitorEvents() {
        return monitorEventRepository.find({});
    }

    async function getLastMonitorEvent(monitorId: Monitor['id']) {
        return monitorEventRepository.findOne({
            where: { monitor: { id: monitorId } },
            order: { createdAt: 'DESC' },
            relations: { monitor: true },
        });
    }

    async function getEventsForMonitor(monitorId: Monitor['id']) {
        return monitorEventRepository.find({
            where: { monitor: { id: monitorId } },
            order: { createdAt: 'DESC' },
        });
    }

    async function createMonitorEvent(
        monitorId: Monitor['id'],
        params: { title: MonitorEvent['title']; kind: MonitorEvent['kind'] },
    ) {
        await monitorEventRepository.insert({
            monitor: { id: monitorId },
            title: params.title,
            kind: params.kind,
        });
        return true;
    }

    function aggregateEvents(
        events: MonitorEvent[],
        period: rangePeriod,
        periodCount: number,
        now: number,
    ): rangeType[] {
        const PERIOD_IN_MILLISECONDS = computePeriodInMilliseconds(period);
        const ranges: rangeType[] = generateArray(periodCount).map((_, index) => ({
            upPercentage: undefined,
            timestamp: now - (periodCount - index) * PERIOD_IN_MILLISECONDS,
        }));
        if (events.length === 0) {
            return ranges;
        }
        const firstEventTimestamp = computeTimestamp(events[0]);
        for (let rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
            if (firstEventTimestamp < ranges[rangeIndex].timestamp) {
                ranges[rangeIndex].upPercentage = 0;
            }
        }

        for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
            for (let rangeIndex = 0; rangeIndex < periodCount; rangeIndex++) {
                const currentEvent = events[eventIndex];
                if (currentEvent.kind === 'up') {
                    const currentEventTimestamp = computeTimestamp(currentEvent);
                    let nextEventTimestamp =
                        eventIndex < events.length - 1
                            ? computeTimestamp(events[eventIndex + 1])
                            : undefined;
                    const currentRangeLeftTimestamp = ranges[rangeIndex].timestamp;
                    const currentRangeRightTimestamp =
                        ranges[rangeIndex].timestamp + PERIOD_IN_MILLISECONDS;

                    if (currentEventTimestamp >= currentRangeRightTimestamp) {
                        continue;
                    }
                    if (
                        nextEventTimestamp !== undefined &&
                        nextEventTimestamp < currentRangeLeftTimestamp
                    ) {
                        continue;
                    }
                    if (currentEventTimestamp <= currentRangeLeftTimestamp) {
                        if (
                            nextEventTimestamp === undefined ||
                            nextEventTimestamp >= currentRangeRightTimestamp
                        ) {
                            ranges[rangeIndex].upPercentage = 100;
                        }

                        if (
                            nextEventTimestamp !== undefined &&
                            nextEventTimestamp < currentRangeRightTimestamp
                        ) {
                            const addedPercentage =
                                (100 * (nextEventTimestamp - currentRangeLeftTimestamp)) /
                                PERIOD_IN_MILLISECONDS;

                            ranges[rangeIndex].upPercentage =
                                (ranges[rangeIndex].upPercentage || 0) + addedPercentage;
                        }
                    }

                    if (currentEventTimestamp > currentRangeLeftTimestamp) {
                        if (
                            nextEventTimestamp === undefined ||
                            nextEventTimestamp >= currentRangeRightTimestamp
                        ) {
                            const addedPercentage =
                                (100 * (currentRangeRightTimestamp - currentEventTimestamp)) /
                                PERIOD_IN_MILLISECONDS;
                            ranges[rangeIndex].upPercentage =
                                (ranges[rangeIndex].upPercentage || 0) + addedPercentage;
                        }

                        if (
                            nextEventTimestamp !== undefined &&
                            nextEventTimestamp < currentRangeRightTimestamp
                        ) {
                            const addedPercentage =
                                (100 * (nextEventTimestamp - currentEventTimestamp)) /
                                PERIOD_IN_MILLISECONDS;

                            ranges[rangeIndex].upPercentage =
                                (ranges[rangeIndex].upPercentage || 0) + addedPercentage;
                        }
                    }
                }
            }
        }

        return ranges;
    }
}

type rangeType = { timestamp: number; upPercentage: number | undefined };
type rangePeriod = 'day' | 'hours';

function computeTimestamp(event: MonitorEvent) {
    return new Date(event.createdAt).getTime();
}

function computePeriodInMilliseconds(period: rangePeriod): number {
    switch (period) {
        case 'hours':
            return 60 * 60 * 1000;
        case 'day':
            return 24 * 60 * 60 * 1000;
    }
}
