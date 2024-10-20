import { Client } from './Client.entity';
import { buildClientService } from './client.service';

export { buildClientController };

function buildClientController() {
    const clientService = buildClientService();
    const clientController = {
        createClient,
        assertIsClientUp,
        getAllClients,
        getClients,
        getClientSummary,
        pingClient,
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

    async function getClients() {
        return clientService.getAllClients();
    }

    async function pingClient(params: { urlParams: { clientId: Client['id'] } }) {
        return clientService.pingClient(params.urlParams.clientId);
    }

    async function getClientSummary(params: { urlParams: { clientId: Client['id'] } }) {
        return clientService.getClientSummary(params.urlParams.clientId);
    }
}
