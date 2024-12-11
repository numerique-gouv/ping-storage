import { dataSource } from '../dataSource';
import { buildMonitorService } from '../modules/monitor';

async function pingAppMonitors() {
    const monitorService = buildMonitorService();
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    console.log('Getting app monitors...');
    const appMonitors = await monitorService.getAppMonitors();
    console.log(`${appMonitors.length} appMonitors found!`);
    console.log('Pinging appMonitors...');
    await Promise.all(
        appMonitors.map(async (appMonitor) => {
            const shouldPingAppMonitor = monitorService.computeShouldPingAppMonitor(
                appMonitor,
                new Date(),
            );
            if (!shouldPingAppMonitor) {
                return;
            }
            return monitorService.pingAppMonitor(appMonitor);
        }),
    );

    console.log('Done!');
}

pingAppMonitors();
