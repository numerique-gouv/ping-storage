import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { systemPulsesApi } from '../lib/api/systemPulsesApi';

function SystemPulseSummary() {
    const params = useParams<{ systemPulseId: string }>();
    const systemPulseId = params.systemPulseId as string;
    const query = useQuery({
        queryFn: () => systemPulsesApi.getSystemPulseSummary(systemPulseId),
        queryKey: ['systemPulses', systemPulseId, 'summary'],
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

export { SystemPulseSummary };
