import { dataSource } from '../dataSource';
import { buildMonitorService } from '../modules/monitor';

async function pingMonitors() {
    const monitorService = buildMonitorService();
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    console.log('Getting monitors...');
    const monitors = await monitorService.getMonitors();
    console.log(`${monitors.length} monitors found!`);
    console.log('Pinging monitors...');
    await Promise.all(
        monitors.map(async (monitor) => {
            const shouldPingMonitor = monitorService.computeShouldPingMonitor(monitor, new Date());
            if (!shouldPingMonitor) {
                return;
            }
            return monitorService.pingMonitor(monitor);
        }),
    );

    console.log('Done!');
}

pingMonitors();
