import { useParams } from 'react-router-dom';
import { monitorsApi } from '../lib/api/monitorsApi';
import { Query } from '../components/Query';
import { AlertSubscriptionButton } from './AlertSubscriptionButton';

function MonitorSummary() {
    const params = useParams<{ monitorId: string }>();
    const monitorId = params.monitorId as string;
    const getMonitorSummary = () => monitorsApi.getMyMonitorSummary(monitorId);

    return (
        <>
            <AlertSubscriptionButton monitorId={monitorId} />
            <Query apiCall={getMonitorSummary} queryKey={['me', 'monitors', monitorId, 'summary']}>
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
        </>
    );
}

export { MonitorSummary };
