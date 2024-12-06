import { dataSource } from '../../dataSource';
import { buildMonitorEventService } from '../monitorEvent';
import { Monitor } from './Monitor.entity';

export { buildMonitorService };

function buildMonitorService() {
    const monitorRepository = dataSource.getRepository(Monitor);
    const monitorService = {
        createMonitor,
        getMonitors,
        computeShouldPingMonitor,
        pingMonitor,
    };

    return monitorService;

    async function createMonitor(params: {
        name: Monitor['name'];
        frequency: Monitor['frequency'];
        url: Monitor['url'];
    }) {
        const result = await monitorRepository.insert({
            name: params.name,
            url: params.url,
            frequency: params.frequency,
        });
        return { monitorId: result.identifiers[0].id };
    }

    async function getMonitors() {
        return monitorRepository.find({});
    }

    async function pingMonitor(monitor: Monitor) {
        const monitorEventService = buildMonitorEventService();
        await monitorRepository.update({ id: monitor.id }, { lastCall: () => 'CURRENT_TIMESTAMP' });
        const lastMonitorEvent = await monitorEventService.getLastMonitorEvent(monitor.id);

        try {
            await fetch(monitor.url);
            await monitorRepository.update(
                { id: monitor.id },
                { lastSuccessfulCall: () => 'CURRENT_TIMESTAMP' },
            );
            if (!lastMonitorEvent) {
                return monitorEventService.createMonitorEvent(monitor.id, {
                    title: 'Service en route !',
                    kind: 'up',
                });
            } else {
                if (lastMonitorEvent.kind === 'down') {
                    await monitorEventService.createMonitorEvent(monitor.id, {
                        title: 'Le service est revenu',
                        kind: 'up',
                    });
                }
            }
        } catch (error) {
            console.error(error);
            if (!lastMonitorEvent) {
                return monitorEventService.createMonitorEvent(monitor.id, {
                    title: 'Service en panne...',
                    kind: 'down',
                });
            } else {
                if (lastMonitorEvent.kind === 'up') {
                    await monitorEventService.createMonitorEvent(monitor.id, {
                        title: 'Le service est tombé !',
                        kind: 'down',
                    });
                }
            }
        }
    }

    function computeShouldPingMonitor(monitor: Monitor, now: Date) {
        if (monitor.lastCall === null) {
            return true;
        }
        const lastCallDate = new Date(monitor.lastCall);
        if (now.getTime() - lastCallDate.getTime() > monitor.frequency * 60 * 1000) {
            return true;
        }
        return false;
    }
}
