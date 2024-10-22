import { dataSource } from '../../dataSource';
import { generateArray } from '../../lib/utils';
import { buildEventService, Event } from '../event';
import { eventKindType } from '../event/types';
import { Client } from './Client.entity';

export { buildClientService };

type rangeType = { timestamp: number; upPercentage: number | undefined };
type rangePeriod = 'day' | 'hours';

function buildClientService() {
    const clientRepository = dataSource.getRepository(Client);
    const eventService = buildEventService();
    const clientService = {
        createClient,
        assertIsClientUpByName,
        getAllClients,
        getClientSummary,
        pingClient,
        checkAllClients,
        aggregateEvents,
    };

    return clientService;

    async function getAllClients() {
        return clientRepository.find({});
    }

    async function createClient(name: Client['name']) {
        const result = await clientRepository.insert({ name });
        return { clientId: result.identifiers[0].id };
    }

    async function pingClient(clientId: Client['id']) {
        const now = new Date();
        const result = await clientRepository.update(
            { id: clientId },
            { lastPingedAt: now.toISOString() },
        );
        if (result.affected !== 1) {
            throw new Error(`client id ${clientId} does not exist`);
        }

        const lastEvent = await eventService.getLastEvent(clientId);
        if (!lastEvent) {
            await eventService.createEvent(clientId, { title: 'Service en route !', kind: 'up' });
        } else {
            if (lastEvent.kind === 'down') {
                await eventService.createEvent(clientId, {
                    title: 'Le service est revenu',
                    kind: 'up',
                });
            }
        }

        return true;
    }

    async function checkAllClients() {
        const clients = await clientRepository.find({});
        const eventService = buildEventService();

        return Promise.all(
            clients.map(async (client) => {
                try {
                    await assertIsClientUp(client);
                } catch (error) {
                    console.error(error);
                    const lastEvent = await eventService.getLastEvent(client.id);
                    if (!lastEvent) {
                        await eventService.createEvent(client.id, {
                            title: 'Le service ne fonctionne pas',
                            kind: 'down',
                        });
                    } else {
                        if (lastEvent.kind === 'up') {
                            await eventService.createEvent(client.id, {
                                title: 'Le service est tombé',
                                kind: 'down',
                            });
                        }
                    }
                }
            }),
        );
    }

    async function assertIsClientUpByName(name: Client['name']) {
        const client = await clientRepository.findOneOrFail({ where: { name } });
        return assertIsClientUp(client);
    }

    async function assertIsClientUp(client: Client) {
        if (!client.lastPingedAt) {
            throw new Error(`Client "${client.name}" has never been pinged`);
        }
        const now = new Date();
        const MAX_DELAY_SINCE_LAST_PING = (client.frequency * 60 + client.gracePeriod * 60) * 1000;
        const lastPingThresholdDate = new Date(now.getTime() - MAX_DELAY_SINCE_LAST_PING);
        const lastPingedAt = new Date(client.lastPingedAt);

        if (lastPingedAt.getTime() < lastPingThresholdDate.getTime()) {
            throw new Error(
                `Last ping found for client "${
                    client.name
                }" was too long ago: ${lastPingedAt.toLocaleString()}`,
            );
        }

        return { ok: true };
    }

    async function getClientStatus(client: Client): Promise<eventKindType> {
        try {
            await assertIsClientUp(client);
            return 'up';
        } catch (error) {
            return 'down';
        }
    }

    async function getClientSummary(clientId: Client['id']) {
        const client = await clientRepository.findOneByOrFail({ id: clientId });
        const events = await eventService.getEventsForClient(clientId);
        const status = await getClientStatus(client);
        return {
            name: client.name,
            status,
            events,
        };
    }

    function aggregateEvents(
        events: Event[],
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
                            if (addedPercentage === -20) {
                                console.log('currentEventTimestamp', currentEventTimestamp);
                                console.log('nextEventTimestamp', nextEventTimestamp);
                                console.log('currentRangeLeftTimestamp', currentRangeLeftTimestamp);
                                console.log(
                                    'currentRangeRightTimestamp',
                                    currentRangeRightTimestamp,
                                );
                            }

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

function computeTimestamp(event: Event) {
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
