import { MoreThan } from 'typeorm';
import { dataSource } from '../../dataSource';
import { Client } from '../client';
import { Ping } from './Ping.entity';
import { buildEventService } from '../event';

export { buildPingService };

const MAX_DELAY_SINCE_LAST_PING = 120 * 1000;

function buildPingService() {
    const pingRepository = dataSource.getRepository(Ping);
    const eventService = buildEventService();

    const pingService = {
        createPing,
        getAllPings,
        assertHasClientBeenPingedRecently,
    };

    return pingService;

    async function getAllPings() {
        return pingRepository.find({ relations: ['client'] });
    }

    async function createPing(clientId: Client['id']) {
        await pingRepository.delete({ client: { id: clientId } });
        await pingRepository.insert({ client: { id: clientId } });

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

    async function assertHasClientBeenPingedRecently(clientId: Client['id']) {
        const now = new Date();
        const lastPingThresholdDate = new Date(now.getTime() - MAX_DELAY_SINCE_LAST_PING);
        const pings = await pingRepository.find({
            relations: ['client'],
            where: {
                client: { id: clientId },
                createdAt: MoreThan(lastPingThresholdDate.toISOString()),
            },
        });
        if (pings.length === 0) {
            throw new Error(
                `No ping found ${MAX_DELAY_SINCE_LAST_PING} ms ago for clientId ${clientId}`,
            );
        }
    }
}
