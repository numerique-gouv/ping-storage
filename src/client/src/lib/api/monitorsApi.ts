import { BASE_URL } from './constants';
import { performApiCall } from './utils';

const monitorsApi = { createMonitor };

async function createMonitor(params: { name: string; frequency: number; url: string }) {
    const URL = `${BASE_URL}/monitors`;
    return performApiCall(URL, 'POST', params);
}

export { monitorsApi };
