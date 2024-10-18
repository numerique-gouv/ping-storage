import { Client } from './Client.entity';
import { buildClientService } from './client.service';

export { buildClientController };

function buildClientController() {
    const clientService = buildClientService();
    const clientController = {
        createClient,
        assertIsClientUp,
        getAllClients,
    };

    return clientController;

    async function createClient(params: { body: { name: Client['name'] } }) {
        return clientService.createClient(params.body.name);
    }

    async function assertIsClientUp(params: { urlParams: { name: Client['name'] } }) {
        return clientService.assertIsClientUp(params.urlParams.name);
    }

    async function getAllClients() {
        return clientService.getAllClients();
    }
}
