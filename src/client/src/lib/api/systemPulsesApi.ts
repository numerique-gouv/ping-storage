import { performApiCall } from './utils';

const systemPulsesApi = { getMySystemPulses, getMySystemPulseSummary };

type systemPulseType = {
    id: string;
    name: string;
};

async function getMySystemPulses() {
    const URI = `me/system-pulses`;
    return performApiCall<systemPulseType[]>(URI, 'GET');
}

type statusValueType = 'up' | 'down';

type eventType = { createdAt: string; kind: statusValueType; title: string; id: number };

type systemPulseSummaryType = {
    name: string;
    status: statusValueType;
    events: Array<eventType>;
};

async function getMySystemPulseSummary(systemPulseId: string) {
    const URI = `me/system-pulses/${systemPulseId}/summary`;
    return performApiCall<systemPulseSummaryType>(URI, 'GET');
}

export { systemPulsesApi };
