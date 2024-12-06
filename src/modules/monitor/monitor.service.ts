import { dataSource } from '../../dataSource';
import { Monitor } from './Monitor.entity';

export { buildMonitorService };

function buildMonitorService() {
    const monitorRepository = dataSource.getRepository(Monitor);
    const monitorService = {
        createMonitor,
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
}
