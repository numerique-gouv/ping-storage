import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';

type statusValueType = 'up' | 'down';

type eventType = { createdAt: string; kind: statusValueType; title: string; id: number };

type clientSummaryType = {
    name: string;
    status: statusValueType;
    events: Array<eventType>;
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
    return (
        <div>
            <h1>{query.data.name}</h1>
            <h2>{query.data.status}</h2>
            <h3>Évènements</h3>
            <ul>
                {query.data.events.map((event) => (
                    <li key={`event-${event.id}`}>
                        <strong>{event.kind}</strong> - {event.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { ClientSummary };
