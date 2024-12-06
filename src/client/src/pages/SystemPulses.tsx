import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Link } from 'react-router-dom';
import { pathHandler } from '../lib/pathHandler';

type systemPulseType = {
    id: string;
    name: string;
};

function SystemPulses() {
    const query = useQuery<systemPulseType[]>({
        queryFn: api.getSystemPulses,
        queryKey: ['systemPulses'],
    });

    if (!query.data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <ul>
                {query.data.map((systemPulse) => (
                    <li key={systemPulse.id}>
                        <Link
                            to={pathHandler.getRoutePath('SYSTEM_PULSE_SUMMARY', {
                                systemPulseId: systemPulse.id,
                            })}
                        >
                            {systemPulse.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { SystemPulses };
