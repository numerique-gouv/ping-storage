import { dataSource } from '../dataSource';
import { api } from '../lib/api';
import { Monitor } from '../modules/monitor';
import { MonitorEvent } from '../modules/monitorEvent';

async function importDb() {
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    const monitorRepository = dataSource.getRepository(Monitor);
    const monitorEventRepository = dataSource.getRepository(MonitorEvent);

    console.log('Erasing local database...');

    await monitorRepository.delete({});
    await monitorEventRepository.delete({});

    console.log('Fetching monitors...');
    const allMonitors = await api.fetchAllMonitors();
    console.log(`${allMonitors.length} monitors fetched! Inserting them in database...`);

    await monitorRepository.insert(allMonitors);
    console.log('Monitors inserted! Now fetching events...');

    const allMonitorEvents = await api.fetchAllMonitorEvents();

    console.log(`${allMonitorEvents.length} events fetched! Inserting them in database...`);

    await monitorEventRepository.insert(allMonitorEvents);
    console.log(`${allMonitorEvents.length} events inserted!`);

    console.log('Done!');
}

importDb();
