import { dataSource } from '../../dataSource';
import { buildEventService } from '../event';
import { buildPingService } from '../ping';
import { Client } from './Client.entity';

export { buildClientService };

function buildClientService() {
    const clientRepository = dataSource.getRepository(Client);
    const pingService = buildPingService();
    const eventService = buildEventService();
    const clientService = {
        createClient,
        assertIsClientUp,
        getAllClients,
        getClientSummary,
        getClientCurrentStatus,
    };

    return clientService;

    async function getAllClients() {
        return clientRepository.find({});
    }

    async function getClientCurrentStatus(clientId: Client['id']) {
        const lastEvent = await eventService.getLastEvent(clientId);
    }

    async function createClient(name: Client['name']) {
        const result = await clientRepository.insert({ name });
        return { clientId: result.identifiers[0].id };
    }

    async function assertIsClientUp(name: Client['name']) {
        const client = await clientRepository.findOneByOrFail({ name });
        await pingService.assertHasClientBeenPingedRecently(client.id);
        return { ok: true };
    }

    async function getClientSummary(clientId: Client['id']) {}
}
