import { BASE_URL } from './constants';
import { performApiCall } from './utils';

const systemPulsesApi = { getSystemPulses, getSystemPulseSummary };

type systemPulseType = {
    id: string;
    name: string;
};

async function getSystemPulses(): Promise<systemPulseType[]> {
    const URL = `${BASE_URL}/system-pulses`;
    return performApiCall(URL, 'GET');
}

type statusValueType = 'up' | 'down';

type eventType = { createdAt: string; kind: statusValueType; title: string; id: number };

type systemPulseSummaryType = {
    name: string;
    status: statusValueType;
    events: Array<eventType>;
};

async function getSystemPulseSummary(clientId: string): Promise<systemPulseSummaryType> {
    const URL = `${BASE_URL}/system-pulses/${clientId}/summary`;
    return performApiCall(URL, 'GET');
}

export { systemPulsesApi };
