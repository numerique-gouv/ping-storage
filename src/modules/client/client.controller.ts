import { buildClientService } from './client.service';

export { buildClientController };

function buildClientController() {
    const clientService = buildClientService();
    const clientController = {
        createClient,
        assertIsClientUp,
    };

    return clientController;

    async function createClient(params: { body: { name: string } }) {
        return clientService.createClient(params.body.name);
    }

    async function assertIsClientUp(params: { urlParams: { clientId: string } }) {
        return clientService.assertIsClientUp(params.urlParams.clientId);
    }
}
