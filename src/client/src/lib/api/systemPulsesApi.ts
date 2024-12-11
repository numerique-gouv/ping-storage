import { BASE_URL } from './constants';
import { performApiCall } from './utils';

const systemPulsesApi = { getMySystemPulses, getMySystemPulseSummary };

type systemPulseType = {
    id: string;
    name: string;
};

async function getMySystemPulses(): Promise<systemPulseType[]> {
    const URL = `${BASE_URL}/me/system-pulses`;
    return performApiCall(URL, 'GET');
}

type statusValueType = 'up' | 'down';

type eventType = { createdAt: string; kind: statusValueType; title: string; id: number };

type systemPulseSummaryType = {
    name: string;
    status: statusValueType;
    events: Array<eventType>;
};

async function getMySystemPulseSummary(clientId: string): Promise<systemPulseSummaryType> {
    const URL = `${BASE_URL}/me/system-pulses/${clientId}/summary`;
    return performApiCall(URL, 'GET');
}

export { systemPulsesApi };
