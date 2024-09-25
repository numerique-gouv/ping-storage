import { dataSource } from '../../dataSource';
import { buildPingService } from '../ping';
import { Client } from './Client.entity';

export { buildClientService };

function buildClientService() {
    const clientRepository = dataSource.getRepository(Client);
    const pingService = buildPingService();
    const clientService = {
        createClient,
        assertIsClientUp,
    };

    return clientService;

    async function createClient(name: Client['name']) {
        const result = await clientRepository.insert({ name });
        return { clientId: result.identifiers[0].id };
    }

    async function assertIsClientUp(name: Client['name']) {
        const client = await clientRepository.findOneByOrFail({ name });
        await pingService.assertHasClientBeenPingedRecently(client.id);
        return { ok: true };
    }
}
