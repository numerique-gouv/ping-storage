import { DataSource } from 'typeorm';
import { config } from './config';

import { SystemPulse } from './modules/systemPulse';
import { Event } from './modules/event';
import { Monitor } from './modules/monitor';

const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    logging: ['warn', 'error'],
    connectTimeoutMS: 20000,
    entities: [SystemPulse, Event, Monitor],
    subscribers: [],
    migrations: ['**/migrations/*.js'],
});

export { dataSource };
