import { buildClientService } from './client.service';

export { buildClientController };

function buildClientController() {
    const clientService = buildClientService();
    const clientController = {
        createClient,
    };

    return clientController;

    async function createClient(params: { body: { name: string } }) {
        return clientService.createClient(params.body.name);
    }
}
