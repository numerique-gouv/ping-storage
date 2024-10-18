import { dataSource } from '../dataSource';
import { api } from '../lib/api';
import { Client } from '../modules/client';
import { Ping } from '../modules/ping';

async function importDb() {
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    const clientRepository = dataSource.getRepository(Client);
    const pingRepository = dataSource.getRepository(Ping);

    console.log('Erasing local database...');

    await clientRepository.delete({});
    await pingRepository.delete({});

    console.log('Fetching clients...');
    const allClients = await api.fetchAllClients();
    console.log(`${allClients.length} clients fetched! Inserting them in database...`);

    await clientRepository.insert(allClients);
    console.log('Clients inserted! Now fetching pings...');

    const allPings = await api.fetchAllPings();

    console.log(`${allPings.length} pings fetched! Inserting them in database...`);

    await pingRepository.insert(allPings);
    console.log(`${allPings.length} pings inserted!`);

    console.log('Done!');
}

importDb();
