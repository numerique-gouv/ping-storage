import { dataSource } from '../../dataSource';
import { SystemPulse } from '../systemPulse';
import { Event } from './Event.entity';

export { buildEventService };

function buildEventService() {
    const eventRepository = dataSource.getRepository(Event);

    const eventService = {
        createEvent,
        getLastEvent,
        getEventsForSystemPulse,
        getAllEvents,
    };

    return eventService;

    async function getLastEvent(systemPulseId: SystemPulse['id']) {
        return eventRepository.findOne({
            where: { systemPulse: { id: systemPulseId } },
            order: { createdAt: 'DESC' },
            relations: ['systemPulse'],
        });
    }

    async function getEventsForSystemPulse(systemPulseId: SystemPulse['id']) {
        return eventRepository.find({
            where: { systemPulse: { id: systemPulseId } },
            order: { createdAt: 'DESC' },
            relations: ['systemPulse'],
        });
    }

    async function getAllEvents() {
        return eventRepository.find({
            relations: ['systemPulse'],
        });
    }

    async function createEvent(
        systemPulseId: SystemPulse['id'],
        params: { title: Event['title']; kind: Event['kind'] },
    ) {
        await eventRepository.insert({
            systemPulse: { id: systemPulseId },
            title: params.title,
            kind: params.kind,
        });
        return true;
    }
}
