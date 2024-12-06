import { dataSource } from '../dataSource';
import { api } from '../lib/api';
import { SystemPulse } from '../modules/systemPulse';
import { Event } from '../modules/event';

async function importDb() {
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    const systemPulseRepository = dataSource.getRepository(SystemPulse);
    const eventRepository = dataSource.getRepository(Event);

    console.log('Erasing local database...');

    await systemPulseRepository.delete({});
    await eventRepository.delete({});

    console.log('Fetching systemPulses...');
    const allSystemPulses = await api.fetchAllSystemPulses();
    console.log(`${allSystemPulses.length} systemPulses fetched! Inserting them in database...`);

    await systemPulseRepository.insert(allSystemPulses);
    console.log('SystemPulses inserted! Now fetching events...');

    const allEvents = await api.fetchAllEvents();

    console.log(`${allEvents.length} events fetched! Inserting them in database...`);

    await eventRepository.insert(allEvents);
    console.log(`${allEvents.length} events inserted!`);

    console.log('Done!');
}

importDb();
