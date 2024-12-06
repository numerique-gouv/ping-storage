import { SystemPulse } from './SystemPulse.entity';
import { buildSystemPulseService } from './systemPulse.service';

export { buildSystemPulseController };

function buildSystemPulseController() {
    const systemPulseService = buildSystemPulseService();
    const systemPulseController = {
        createSystemPulse,
        assertIsSystemPulseUpByName,
        getAllSystemPulses,
        getSystemPulses,
        getSystemPulseSummary,
        pingSystemPulse,
    };

    return systemPulseController;

    async function createSystemPulse(params: { body: { name: SystemPulse['name'] } }) {
        return systemPulseService.createSystemPulse(params.body.name);
    }

    async function assertIsSystemPulseUpByName(params: {
        urlParams: { name: SystemPulse['name'] };
    }) {
        return systemPulseService.assertIsSystemPulseUpByName(params.urlParams.name);
    }

    async function getAllSystemPulses() {
        return systemPulseService.getAllSystemPulses();
    }

    async function getSystemPulses() {
        return systemPulseService.getAllSystemPulses();
    }

    async function pingSystemPulse(params: { urlParams: { systemPulseId: SystemPulse['id'] } }) {
        return systemPulseService.pingSystemPulse(params.urlParams.systemPulseId);
    }

    async function getSystemPulseSummary(params: {
        urlParams: { systemPulseId: SystemPulse['id'] };
    }) {
        return systemPulseService.getSystemPulseSummary(params.urlParams.systemPulseId);
    }
}
