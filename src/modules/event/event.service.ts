import { dataSource } from '../../dataSource';
import { Client } from '../client';
import { Event } from './Event.entity';

export { buildEventService };

function buildEventService() {
    const eventRepository = dataSource.getRepository(Event);

    const eventService = {
        createEvent,
        getLastEvent,
        getEvents,
        getAllEvents,
    };

    return eventService;

    async function getLastEvent(clientId: Client['id']) {
        return eventRepository.findOne({
            where: { client: { id: clientId } },
            order: { createdAt: 'DESC' },
            relations: ['client'],
        });
    }

    async function getEvents(clientId: Client['id']) {
        return eventRepository.find({
            where: { client: { id: clientId } },
            order: { createdAt: 'DESC' },
            relations: ['client'],
        });
    }

    async function getAllEvents() {
        return eventRepository.find({
            relations: ['client'],
        });
    }

    async function createEvent(
        clientId: Client['id'],
        params: { title: Event['title']; kind: Event['kind'] },
    ) {
        await eventRepository.insert({
            client: { id: clientId },
            title: params.title,
            kind: params.kind,
        });
        return true;
    }
}
