import { DataSource } from 'typeorm';
import { config } from './config';

import { SystemPulse } from './modules/systemPulse';
import { Event } from './modules/event';
import { Monitor } from './modules/monitor';
import { MonitorEvent } from './modules/monitorEvent';
import { User } from './modules/user';

const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    logging: ['warn', 'error'],
    connectTimeoutMS: 20000,
    entities: [SystemPulse, Event, Monitor, MonitorEvent, User],
    subscribers: [],
    migrations: ['**/migrations/*.js'],
});

export { dataSource };
