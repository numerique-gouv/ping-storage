import { useParams } from 'react-router-dom';
import { systemPulsesApi } from '../lib/api/systemPulsesApi';
import { Query } from '../components/Query';

function SystemPulseSummary() {
    const params = useParams<{ systemPulseId: string }>();
    const systemPulseId = params.systemPulseId as string;
    const getSystemPulseSummary = () => systemPulsesApi.getSystemPulseSummary(systemPulseId);

    return (
        <Query
            apiCall={getSystemPulseSummary}
            queryKey={['system-pulses', systemPulseId, 'summary']}
        >
            {(data) => (
                <div>
                    <h1>{data.name}</h1>
                    <h2>{data.status}</h2>
                    <h3>Évènements</h3>
                    <ul>
                        {data.events.map((event) => (
                            <li key={`event-${event.id}`}>
                                <strong>{event.kind}</strong> - {event.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Query>
    );
}

export { SystemPulseSummary };
