import { Client } from '../modules/client';
import { Ping } from '../modules/ping';

const api = {
    fetchAllClients,
    fetchAllPings,
};
const BASE_URL = 'https://ping-storage.osc-fr1.scalingo.io';

async function fetchAllClients(): Promise<Client[]> {
    const URL = `${BASE_URL}/api/clients`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllPings(): Promise<Ping[]> {
    const URL = `${BASE_URL}/api/pings`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

export { api };
