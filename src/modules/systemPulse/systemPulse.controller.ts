import { User } from '../user';
import { SystemPulse } from './SystemPulse.entity';
import { buildSystemPulseService } from './systemPulse.service';

export { buildSystemPulseController };

function buildSystemPulseController() {
    const systemPulseService = buildSystemPulseService();
    const systemPulseController = {
        createSystemPulse,
        assertIsSystemPulseUpByName,
        getAllSystemPulses,
        getMySystemPulses,
        getMySystemPulseSummary,
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

    async function getMySystemPulses(_params: {}, user: User) {
        return systemPulseService.getMySystemPulses(user);
    }

    async function pingSystemPulse(params: { urlParams: { systemPulseId: SystemPulse['id'] } }) {
        return systemPulseService.pingSystemPulse(params.urlParams.systemPulseId);
    }

    async function getMySystemPulseSummary(params: {
        urlParams: { systemPulseId: SystemPulse['id'] };
    }) {
        return systemPulseService.getMySystemPulseSummary(params.urlParams.systemPulseId);
    }
}
