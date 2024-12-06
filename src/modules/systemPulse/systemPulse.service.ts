import { dataSource } from '../../dataSource';
import { buildEventService } from '../event';
import { eventKindType } from '../event/types';
import { SystemPulse } from './SystemPulse.entity';

export { buildSystemPulseService };

function buildSystemPulseService() {
    const systemPulseRepository = dataSource.getRepository(SystemPulse);
    const eventService = buildEventService();
    const systemPulseService = {
        createSystemPulse,
        assertIsSystemPulseUpByName,
        getAllSystemPulses,
        getSystemPulseSummary,
        pingSystemPulse,
        checkAllSystemPulses,
    };

    return systemPulseService;

    async function getAllSystemPulses() {
        return systemPulseRepository.find({});
    }

    async function createSystemPulse(name: SystemPulse['name']) {
        const result = await systemPulseRepository.insert({ name });
        return { systemPulseId: result.identifiers[0].id };
    }

    async function pingSystemPulse(systemPulseId: SystemPulse['id']) {
        const now = new Date();
        const result = await systemPulseRepository.update(
            { id: systemPulseId },
            { lastPingedAt: now.toISOString() },
        );
        if (result.affected !== 1) {
            throw new Error(`systemPulse id ${systemPulseId} does not exist`);
        }

        const lastEvent = await eventService.getLastEvent(systemPulseId);
        if (!lastEvent) {
            await eventService.createEvent(systemPulseId, {
                title: 'Service en route !',
                kind: 'up',
            });
        } else {
            if (lastEvent.kind === 'down') {
                await eventService.createEvent(systemPulseId, {
                    title: 'Le service est revenu',
                    kind: 'up',
                });
            }
        }

        return true;
    }

    async function checkAllSystemPulses() {
        const systemPulses = await systemPulseRepository.find({});
        const eventService = buildEventService();

        return Promise.all(
            systemPulses.map(async (systemPulse) => {
                try {
                    await assertIsSystemPulseUp(systemPulse);
                } catch (error) {
                    console.error(error);
                    const lastEvent = await eventService.getLastEvent(systemPulse.id);
                    if (!lastEvent) {
                        await eventService.createEvent(systemPulse.id, {
                            title: 'Le service ne fonctionne pas',
                            kind: 'down',
                        });
                    } else {
                        if (lastEvent.kind === 'up') {
                            await eventService.createEvent(systemPulse.id, {
                                title: 'Le service est tombé',
                                kind: 'down',
                            });
                        }
                    }
                }
            }),
        );
    }

    async function assertIsSystemPulseUpByName(name: SystemPulse['name']) {
        const systemPulse = await systemPulseRepository.findOneOrFail({ where: { name } });
        return assertIsSystemPulseUp(systemPulse);
    }

    async function assertIsSystemPulseUp(systemPulse: SystemPulse) {
        if (!systemPulse.lastPingedAt) {
            throw new Error(`SystemPulse "${systemPulse.name}" has never been pinged`);
        }
        const now = new Date();
        const MAX_DELAY_SINCE_LAST_PING =
            (systemPulse.frequency * 60 + systemPulse.gracePeriod * 60) * 1000;
        const lastPingThresholdDate = new Date(now.getTime() - MAX_DELAY_SINCE_LAST_PING);
        const lastPingedAt = new Date(systemPulse.lastPingedAt);

        if (lastPingedAt.getTime() < lastPingThresholdDate.getTime()) {
            throw new Error(
                `Last ping found for systemPulse "${
                    systemPulse.name
                }" was too long ago: ${lastPingedAt.toLocaleString()}`,
            );
        }

        return { ok: true };
    }

    async function getSystemPulseStatus(systemPulse: SystemPulse): Promise<eventKindType> {
        try {
            await assertIsSystemPulseUp(systemPulse);
            return 'up';
        } catch (error) {
            return 'down';
        }
    }

    async function getSystemPulseSummary(systemPulseId: SystemPulse['id']) {
        const systemPulse = await systemPulseRepository.findOneByOrFail({ id: systemPulseId });
        const events = await eventService.getEventsForSystemPulse(systemPulseId);
        const status = await getSystemPulseStatus(systemPulse);
        return {
            name: systemPulse.name,
            status,
            events,
        };
    }
}
