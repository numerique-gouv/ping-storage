import { dataSource } from '../dataSource';
import { buildClientService, Client } from '../modules/client';

async function checkClients() {
    const clientService = buildClientService();
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    console.log('Checking clients...');

    await clientService.checkAllClients();

    console.log('Done!');
}

checkClients();
