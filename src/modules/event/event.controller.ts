import { buildEventService } from './event.service';

export { buildEventController };

function buildEventController() {
    const eventService = buildEventService();
    const eventController = {
        getAllEvents,
    };

    return eventController;

    async function getAllEvents() {
        return eventService.getAllEvents();
    }
}
