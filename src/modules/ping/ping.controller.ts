import { buildPingService } from './ping.service';

export { buildPingController };

function buildPingController() {
    const pingService = buildPingService();
    const pingController = {
        createPing,
        getAllPings,
    };

    return pingController;

    async function createPing(params: { urlParams: { clientId: string } }) {
        return pingService.createPing(params.urlParams.clientId);
    }

    async function getAllPings() {
        return pingService.getAllPings();
    }
}
