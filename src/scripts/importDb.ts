import { dataSource } from '../dataSource';
import { api } from '../lib/api';
import { Client } from '../modules/client';
import { Event } from '../modules/event';

async function importDb() {
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    const clientRepository = dataSource.getRepository(Client);
    const eventRepository = dataSource.getRepository(Event);

    console.log('Erasing local database...');

    await clientRepository.delete({});
    await eventRepository.delete({});

    console.log('Fetching clients...');
    const allClients = await api.fetchAllClients();
    console.log(`${allClients.length} clients fetched! Inserting them in database...`);

    await clientRepository.insert(allClients);
    console.log('Clients inserted! Now fetching events...');

    const allEvents = await api.fetchAllEvents();

    console.log(`${allEvents.length} events fetched! Inserting them in database...`);

    await eventRepository.insert(allEvents);
    console.log(`${allEvents.length} events inserted!`);

    console.log('Done!');
}

importDb();
