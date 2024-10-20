import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';

type statusValueType = 'up' | 'down';

// type elementaryStatusType = { timestamp: number; statusValue: statusValueType };

type eventType = { timestamp: number; kind: statusValueType; title: string };

type clientSummaryType = {
    id: string;
    name: string;
    currentStatusValue: statusValueType;
    // uptime: {
    //     last24Hours: elementaryStatusType[];
    //     last90Days: elementaryStatusType[];
    // };
    // overallUptime: {
    //     last24Hours: number;
    //     last7Days: number;
    //     last30Days: number;
    //     last90Days: number;
    // };
    events: eventType[];
};

function ClientSummary() {
    const params = useParams<{ clientId: string }>();
    const clientId = params.clientId as string;
    const query = useQuery<clientSummaryType>({
        queryFn: () => api.getClientSummary(clientId),
        queryKey: ['clients', clientId, 'summary'],
    });

    if (!query.data) {
        return <div>Loading...</div>;
    }
    return <div></div>;
}

export { ClientSummary };
