import { useQuery } from '@tanstack/react-query';
import { monitorsApi } from '../../lib/api/monitorsApi';
import { MonitorCreationForm } from './MonitorCreationForm';

function Monitors() {
    const query = useQuery({
        queryFn: monitorsApi.getMyMonitors,
        queryKey: ['monitors'],
    });

    if (!query.data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <MonitorCreationForm />
            <ul>
                {query.data.map((monitor) => (
                    <li key={monitor.id}>{monitor.displayName}</li>
                ))}
            </ul>
        </div>
    );
}

export { Monitors };
