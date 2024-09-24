import { dataSource } from '../../dataSource';
import { buildClientService, Client } from '../client';
import { Ping } from './Ping.entity';

export { buildPingService };

function buildPingService() {
    const pingRepository = dataSource.getRepository(Ping);

    const pingService = {
        createPing,
    };

    return pingService;

    async function createPing(clientId: Client['id']) {
        // const clientService = buildClientService();
        // const client = await clientService.getClient(clientId);
        await pingRepository.insert({ client: { id: clientId } });
        return true;
    }
}
