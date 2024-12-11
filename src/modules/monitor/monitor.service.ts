import { dataSource } from '../../dataSource';
import { slugify } from '../../lib/utils';
import { buildMonitorEventService } from '../monitorEvent';
import { User } from '../user';
import { Monitor } from './Monitor.entity';

export { buildMonitorService };

function buildMonitorService() {
    const monitorRepository = dataSource.getRepository(Monitor);
    const monitorService = {
        getMonitors,
        getMyMonitors,
        createMonitor,
        computeShouldPingMonitor,
        pingMonitor,
    };

    return monitorService;

    async function createMonitor(params: {
        displayName: Monitor['displayName'];
        frequency: Monitor['frequency'];
        url: Monitor['url'];
        user: User;
    }) {
        const name = slugify(params.displayName);
        const result = await monitorRepository.insert({
            displayName: params.displayName,
            name,
            url: params.url,
            frequency: params.frequency,
            user: params.user,
        });
        return { monitorId: result.identifiers[0].id };
    }

    async function getMonitors() {
        return monitorRepository.find({});
    }

    async function getMyMonitors(user: User) {
        return monitorRepository.find({ where: { user } });
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
