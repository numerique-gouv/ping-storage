import { dataSource } from '../../dataSource';
import { Monitor } from '../monitor';
import { MonitorEvent } from './MonitorEvent.entity';

export { buildMonitorEventService };

function buildMonitorEventService() {
    const monitorMonitorEventRepository = dataSource.getRepository(MonitorEvent);

    const monitorMonitorEventService = {
        createMonitorEvent,
        getLastMonitorEvent,
    };

    return monitorMonitorEventService;

    async function getLastMonitorEvent(monitorId: Monitor['id']) {
        return monitorMonitorEventRepository.findOne({
            where: { monitor: { id: monitorId } },
            order: { createdAt: 'DESC' },
            relations: ['monitor'],
        });
    }

    async function createMonitorEvent(
        monitorId: Monitor['id'],
        params: { title: MonitorEvent['title']; kind: MonitorEvent['kind'] },
    ) {
        await monitorMonitorEventRepository.insert({
            monitor: { id: monitorId },
            title: params.title,
            kind: params.kind,
        });
        return true;
    }
}
