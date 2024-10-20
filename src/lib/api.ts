import { Client } from '../modules/client';
import { Event } from '../modules/event';

const api = {
    fetchAllClients,
    fetchAllEvents,
};
const BASE_URL = 'https://ping-storage.osc-fr1.scalingo.io';

async function fetchAllClients(): Promise<Client[]> {
    const URL = `${BASE_URL}/api/all-clients`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllEvents(): Promise<Event[]> {
    const URL = `${BASE_URL}/api/all-events`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

export { api };
