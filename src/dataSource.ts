import { DataSource } from 'typeorm';
import { config } from './config';

import { Client } from './modules/client';
import { Ping } from './modules/ping';
import { Event } from './modules/event';

const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    logging: ['warn', 'error'],
    connectTimeoutMS: 20000,
    entities: [Client, Ping, Event],
    subscribers: [],
    migrations: ['**/migrations/*.js'],
});

export { dataSource };
