import { MoreThan } from 'typeorm';
import { dataSource } from '../../dataSource';
import { Client } from '../client';
import { Ping } from './Ping.entity';

export { buildPingService };

const MAX_DELAY_SINCE_LAST_PING = 120 * 1000;

function buildPingService() {
    const pingRepository = dataSource.getRepository(Ping);

    const pingService = {
        createPing,
        assertHasClientBeenPingedRecently,
    };

    return pingService;

    async function createPing(clientId: Client['id']) {
        await pingRepository.insert({ client: { id: clientId } });
        return true;
    }

    async function assertHasClientBeenPingedRecently(clientId: Client['id']) {
        const now = new Date();
        const lastPingThresholdDate = new Date(now.getTime() - MAX_DELAY_SINCE_LAST_PING);
        const pingCount = await pingRepository.count({
            relations: ['client'],
            where: {
                client: { id: clientId },
                createdAt: MoreThan(lastPingThresholdDate.toISOString()),
            },
        });
        if (pingCount === 0) {
            throw new Error(
                `No ping found ${MAX_DELAY_SINCE_LAST_PING} ms ago for clientId ${clientId}`,
            );
        }
    }
}
