import { slugify } from '../../../lib/utils';
import { User } from '../../user';
import { Monitor } from '../Monitor.entity';
import { appMonitorDtoType } from '../types';

function convertAppMonitorDtoToMonitor(appMonitorDto: appMonitorDtoType, user: User): Monitor {
    const name = slugify(appMonitorDto.displayName);
    const monitor = new Monitor();
    monitor.displayName = appMonitorDto.displayName;
    monitor.name = name;
    monitor.url = appMonitorDto.url;
    monitor.frequency = appMonitorDto.frequency;
    monitor.user = user;
    return monitor;
}

export { convertAppMonitorDtoToMonitor };
