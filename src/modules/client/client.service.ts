import { dataSource } from '../../dataSource';
import { Client } from './Client.entity';

export { buildClientService };

function buildClientService() {
    const clientRepository = dataSource.getRepository(Client);

    const clientService = {
        createClient,
        getClient,
    };

    return clientService;

    async function createClient(name: Client['name']) {
        const result = await clientRepository.insert({ name });
        return { clientId: result.identifiers[0].id };
    }

    async function getClient(id: Client['id']) {
        return clientRepository.findOneOrFail({ where: { id } });
    }
}
