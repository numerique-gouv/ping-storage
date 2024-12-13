import { dataSource } from '../../dataSource';
import { buildUptimeRobotApi } from '../../lib/externalApis/uptimeRobotApi';
import { slugify } from '../../lib/utils';
import { buildMonitorEventService } from '../monitorEvent';
import { eventKindType } from '../monitorEvent/types';
import { User } from '../user';
import { convertAppMonitorDtoToMonitor } from './lib/convertAppMonitorDtoToMonitor';
import { Monitor } from './Monitor.entity';
import { appMonitorDtoType, appMonitorType, cronMonitorType } from './types';

export { buildMonitorService };

function buildMonitorService() {
    const monitorRepository = dataSource.getRepository(Monitor);
    const monitorService = {
        assertIsMonitorUpByName,
        getAppMonitors,
        getMyMonitorSummary,
        getMyMonitors,
        createAppMonitor,
        createAppMonitors,
        computeShouldPingAppMonitor,
        pingAppMonitor,
        checkAllCronMonitors,
        pingCronMonitor,
        fetchMonitorsFromUptimeRobot,
    };

    return monitorService;

    async function createAppMonitor(appMonitorDto: appMonitorDtoType, user: User) {
        const monitor = convertAppMonitorDtoToMonitor(appMonitorDto, user);

        return monitorRepository.save(monitor);
    }
    async function createAppMonitors(appMonitorDtos: appMonitorDtoType[], user: User) {
        const monitors = appMonitorDtos.map((appMonitorDto) =>
            convertAppMonitorDtoToMonitor(appMonitorDto, user),
        );

        return monitorRepository.save(monitors);
    }

    async function assertIsMonitorUpByName(name: Monitor['name']) {
        const monitor = await monitorRepository.findOneOrFail({ where: { name } });
        switch (monitor.kind) {
            case 'app':
                return { ok: true };
            case 'cron':
                return assertIsCronMonitorUp(monitor as cronMonitorType);
        }
    }

    async function getAppMonitors() {
        const appMonitors = await monitorRepository.find({ where: { kind: 'app' } });
        return appMonitors as appMonitorType[];
    }

    async function getMyMonitors(user: User) {
        return monitorRepository.find({ where: { user } });
    }

    async function getMyMonitorSummary(monitorId: Monitor['id']) {
        const monitorEventService = buildMonitorEventService();

        const cronMonitor = (await monitorRepository.findOneByOrFail({
            id: monitorId,
            kind: 'cron',
        })) as cronMonitorType;
        const monitorEvents = await monitorEventService.getEventsForMonitor(monitorId);
        const status = await getCronMonitorStatus(cronMonitor);
        return {
            name: cronMonitor.name,
            status,
            events: monitorEvents,
        };
    }

    async function checkAllCronMonitors() {
        const cronMonitors = (await monitorRepository.find({
            where: { kind: 'cron' },
        })) as cronMonitorType[];
        const monitorEventService = buildMonitorEventService();

        return Promise.all(
            cronMonitors.map(async (cronMonitor) => {
                try {
                    await assertIsCronMonitorUp(cronMonitor);
                } catch (error) {
                    console.error(error);
                    const lastEvent = await monitorEventService.getLastMonitorEvent(cronMonitor.id);
                    if (!lastEvent) {
                        await monitorEventService.createMonitorEvent(cronMonitor.id, {
                            title: 'Le service ne fonctionne pas',
                            kind: 'down',
                        });
                    } else {
                        if (lastEvent.kind === 'up') {
                            await monitorEventService.createMonitorEvent(cronMonitor.id, {
                                title: 'Le service est tombé',
                                kind: 'down',
                            });
                        }
                    }
                }
            }),
        );
    }

    async function pingCronMonitor(cronMonitorId: Monitor['id']) {
        const now = new Date();
        const result = await monitorRepository.update(
            { id: cronMonitorId },
            { lastPingedAt: now.toISOString() },
        );
        if (result.affected !== 1) {
            throw new Error(`cronMonitor id ${cronMonitorId} does not exist`);
        }

        const monitorEventService = buildMonitorEventService();

        const lastEvent = await monitorEventService.getLastMonitorEvent(cronMonitorId);
        if (!lastEvent) {
            await monitorEventService.createMonitorEvent(cronMonitorId, {
                title: 'Service en route !',
                kind: 'up',
            });
        } else {
            if (lastEvent.kind === 'down') {
                await monitorEventService.createMonitorEvent(cronMonitorId, {
                    title: 'Le service est revenu',
                    kind: 'up',
                });
            }
        }

        return true;
    }

    async function assertIsCronMonitorUp(cronMonitor: cronMonitorType) {
        if (!cronMonitor.lastPingedAt) {
            throw new Error(`Cron Monitor "${cronMonitor.name}" has never been pinged`);
        }
        const now = new Date();
        const MAX_DELAY_SINCE_LAST_PING =
            (cronMonitor.frequency * 60 + cronMonitor.gracePeriod * 60) * 1000;
        const lastPingThresholdDate = new Date(now.getTime() - MAX_DELAY_SINCE_LAST_PING);
        const lastPingedAt = new Date(cronMonitor.lastPingedAt);

        if (lastPingedAt.getTime() < lastPingThresholdDate.getTime()) {
            throw new Error(
                `Last ping found for cronMonitor "${
                    cronMonitor.name
                }" was too long ago: ${lastPingedAt.toLocaleString()}`,
            );
        }

        return { ok: true };
    }

    async function pingAppMonitor(monitor: appMonitorType) {
        const monitorEventService = buildMonitorEventService();
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

    function computeShouldPingAppMonitor(appMonitor: appMonitorType, now: Date) {
        if (appMonitor.lastCall === null) {
            return true;
        }
        const lastCallDate = new Date(appMonitor.lastCall);
        if (now.getTime() - lastCallDate.getTime() > appMonitor.frequency * 60 * 1000) {
            return true;
        }
        return false;
    }

    async function getCronMonitorStatus(cronMonitor: cronMonitorType): Promise<eventKindType> {
        try {
            await assertIsCronMonitorUp(cronMonitor);
            return 'up';
        } catch (error) {
            return 'down';
        }
    }

    async function fetchMonitorsFromUptimeRobot(uptimeRobotApiKey: string) {
        const uptimeRobotApi = buildUptimeRobotApi(uptimeRobotApiKey);

        return uptimeRobotApi.fetchMonitors();
    }
}
