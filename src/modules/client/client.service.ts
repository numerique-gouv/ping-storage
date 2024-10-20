import { dataSource } from '../../dataSource';
import { buildEventService } from '../event';
import { eventKindType } from '../event/types';
import { Client } from './Client.entity';

export { buildClientService };

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
        await assertIsClientUp(client);
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
}
