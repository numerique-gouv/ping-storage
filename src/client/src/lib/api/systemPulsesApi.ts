import { performApiCall } from './utils';

const systemPulsesApi = { getMySystemPulses, getMySystemPulseSummary };

type systemPulseType = {
    id: string;
    name: string;
};

async function getMySystemPulses(): Promise<systemPulseType[]> {
    const URI = `me/system-pulses`;
    return performApiCall(URI, 'GET');
}

type statusValueType = 'up' | 'down';

type eventType = { createdAt: string; kind: statusValueType; title: string; id: number };

type systemPulseSummaryType = {
    name: string;
    status: statusValueType;
    events: Array<eventType>;
};

async function getMySystemPulseSummary(clientId: string): Promise<systemPulseSummaryType> {
    const URI = `me/system-pulses/${clientId}/summary`;
    return performApiCall(URI, 'GET');
}

export { systemPulsesApi };
