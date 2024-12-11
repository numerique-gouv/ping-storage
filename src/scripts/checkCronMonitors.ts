import { dataSource } from '../dataSource';
import { buildMonitorService } from '../modules/monitor';

async function checkCronMonitors() {
    const monitorService = buildMonitorService();
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    console.log('Checking cron monitors...');

    await monitorService.checkAllCronMonitors();

    console.log('Done!');
}

checkCronMonitors();
